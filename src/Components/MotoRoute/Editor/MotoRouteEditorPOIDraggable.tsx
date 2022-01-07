import { CSSProperties, FC, memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { mapIconCirclesUrls } from 'src/Components/MapConstants'
import { POIType } from 'src/Types/MotoRoutesTypes'

import "./MotoRouteEditorPOITab.scss"
  

const style: CSSProperties = {
  cursor: 'move',
}

export interface CardProps {
  id: string
  poi: POIType
  isSelected: boolean
  moveCard: (id: string, to: number) => void
  findCard: (id: string) => { index: number }
  onClick: () => void
  onPOIHover: (mouseenter: boolean, poi: POIType) => void
}

interface Item {
  id: string
  originalIndex: number
}

export const MotoRouteEditorPOIDraggable: FC<CardProps> = memo(function Card({
    id,
    poi,
    isSelected,
    moveCard,
    findCard,
    onClick,
    onPOIHover
    }) {
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
  return (
    <div 
        className={`list-group-item list-group-item-${isSelected ? "selected" : "collapsed"} flex-column align-items-start`}
        ref={(node) => drag(drop(node))} 
        style={{ ...style, opacity }}
        onMouseEnter={() => onPOIHover(true, poi)} 
        onMouseLeave={() => onPOIHover(false, poi)} 
        onClick={ onClick }
        >



        <div className="d-flex flex-row">
            <div className="icon-container">
                <img className="map-icon" alt="map-icon" src={ mapIconCirclesUrls[poi.variant] } />
            </div>
            <div className="description-container d-flex flex-column">

                <div className="d-flex w-100 justify-content-between">
                    <h5 className="">{poi.name}</h5>
                </div>
                <div className="description-collapsible">
                    <p className={`description ${isSelected ? "" : "collapsed"}`}>{poi.description}</p>
                </div>
            </div>
        </div>
    </div>
  )
})
