import { CSSProperties, FC, memo, useMemo, useState } from 'react'
import { TrashFill } from 'react-bootstrap-icons';
import { useDrag, useDrop } from 'react-dnd'
import Select from 'react-select';
import { mapIconCirclesUrls } from 'src/Components/MapConstants'
import { POIType, POIVariant } from 'src/Types/MotoRoutesTypes'

import "./MotoRouteEditorPOITab.scss"
  

const style: CSSProperties = {
  cursor: 'move',
}


const selectNoBorderStyles = {
  control: (styles: any, state: any) => ({ 
      ...styles, 
      border: 'none',
      boxShadow: 'none', // disable blue outline on focus
  }),
}

export interface CardProps {
  id: string
  poi: POIType
  isSelected: boolean
  moveCard: (id: string, to: number) => void
  findCard: (id: string) => { index: number }
  onClick: () => void
  onPOIHover: (mouseenter: boolean, poi: POIType) => void
  handlePOIDetailsChange: (id: number, field: string, value: any) => void
  removePOI: (index: number) => void
}

interface Item {
  id: string
  originalIndex: number
}


type FieldErrorType = {
  name: string | null, 
  description: string | null,
}

const blankError = {
  name: null, 
  description: null,
};

const MAX_NAME_LENGTH = 100
const MAX_DESCRIPTION_LENGTH = 250
const DEFAULT_DESCRIPTION_ROWS = 3

export const MotoRouteEditorPOIDraggable: FC<CardProps> = memo(function Card({
    id,
    poi,
    isSelected,
    moveCard,
    findCard,
    onClick,
    onPOIHover,
    handlePOIDetailsChange,
    removePOI
    }) {

  // ============================= DRAG AND DROP ==================
  const originalIndex = findCard(id).index

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const { id: droppedId, originalIndex } = item
      const didDrop = monitor.didDrop()
      if (!didDrop) {
        moveCard(droppedId, originalIndex)
      }
    },
  }), [id, originalIndex, moveCard], )

  const [, drop] = useDrop(() => ({
    accept: 'card',
    hover({ id: draggedId }: Item) {
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id)
        moveCard(draggedId, overIndex)
      }
    },
  }), [findCard, moveCard], )

  const opacity = isDragging ? 0 : 1
  // ===============================================

  const [fieldErrs, setFieldErrs] = useState<FieldErrorType>(blankError)


  const descriptionCharactersLeft = useMemo(() => {
      return MAX_DESCRIPTION_LENGTH - poi.description.length
  }, [poi.description])

  const availableVariants = Object.values(POIVariant).map((item) => (
    {value: item, label: item}
  ))

  return (
    <div 
        className={`list-group-item list-group-item-${isSelected ? "selected" : "collapsed"} flex-column align-items-start`}
        ref={(node) => drag(drop(node))} 
        style={{ ...style, opacity }}
        onMouseEnter={() => onPOIHover(true, poi)} 
        onMouseLeave={() => onPOIHover(false, poi)} 
        onClick={ onClick }
        id={ id }
        >


        <div className="d-flex flex-row">
            <div className="icon-container">
                <img className="map-icon" alt="map-icon" src={ mapIconCirclesUrls[poi.variant] } />
            </div>
            <div className="description-container d-flex flex-column">


                {/* Name */}
                <div className="form-group">
                    <label className="poi-name-label" htmlFor="name">Name: <span className="remove-poi" onClick={() => removePOI(poi.id)}><TrashFill /></span></label>
                    <input 
                        className={ `loginbox-form-control form-control ${ fieldErrs.name ? "invalid" : "" }` }
                        name={ `name` } 
                        type="text" 
                        maxLength={ MAX_NAME_LENGTH }
                        placeholder="PoI name" 
                        value={ poi.name } 
                        onChange={ (e: any) => handlePOIDetailsChange(poi.id, e.target.name, e.target.value) } 
                    />
                </div>

                {/* Description*/}
                <div className="form-group">
                    <label htmlFor="name">Description:</label>
                    <textarea 
                        className={ `loginbox-form-control form-control ${ fieldErrs.description ? "invalid" : "" }` }
                        name={ `description` } 
                        placeholder="PoI description" 
                        value={ poi.description } 
                        maxLength={ MAX_DESCRIPTION_LENGTH }
                        rows={ DEFAULT_DESCRIPTION_ROWS }
                        onChange={ (e: any) => handlePOIDetailsChange(poi.id, e.target.name, e.target.value) } 
                    />
                    <small>Characters left: {descriptionCharactersLeft}</small>
                </div>

                {/* Variant */} 
                <div className="form-group">
                  <div className="input-group">
                      <label className="input-group-text" htmlFor="date-open">Type:&nbsp;&nbsp;&nbsp;</label>
                      <Select
                          name={ "variant" } 
                          menuPlacement="top"
                          className="form-control"
                          styles={ selectNoBorderStyles }
                          value={ {value: poi.variant, label: poi.variant} }
                          options={ availableVariants }
                          onChange={ (e: any) => handlePOIDetailsChange(poi.id, "variant", e.value) } 
                      />
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
})
