import { CSSProperties, FC, memo } from 'react'
import { TrashFill } from 'react-bootstrap-icons'
import { useDrag, useDrop } from 'react-dnd'
  

const style: CSSProperties = {
  backgroundColor: 'white',
  cursor: 'move',
}

export interface CardProps {
  id: string
  index: number
  title: string
  moveCard: (id: string, to: number) => void
  findCard: (id: string) => { index: number }
  removeWaypoint: (id: number) => void;
  waypoint: {lat: number, lng: number}
}

interface Item {
  id: string
  originalIndex: number
}

export const getWaypointDraggableId = (waypoint: {lat: number, lng: number}): string => {
  return waypoint.lat.toString() + ";" + waypoint.lng.toString()
}

export const MotoRouteEditorWaypointDraggable: FC<CardProps> = memo(function Card({
  id,
  title,
  index,
  moveCard,
  findCard,
  removeWaypoint,
  waypoint
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
      className={`list-group-item flex-column align-items-start`}
      ref={(node) => drag(drop(node))} 
      style={{ ...style, opacity }}
    >

      <div className="d-flex flex-row">
          <div className="description-container d-flex flex-column">

              <div className="d-flex w-100 justify-content-between">
                  <h5 className="waypoint-title">
                      { title }
                      <span className="remove-waypoint" onClick={() => removeWaypoint(index)}><TrashFill /></span>
                  </h5>
              </div>
              <div className="description-collapsible">
                  <p>Latitude: {waypoint.lat.toFixed(2)} Longitude: {waypoint.lng.toFixed(2)}</p>
              </div>
          </div>
      </div>
    </div>
  )
})
