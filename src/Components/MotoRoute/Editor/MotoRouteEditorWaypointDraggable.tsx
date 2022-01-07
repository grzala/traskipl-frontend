import { CSSProperties, FC, memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'
  

const style: CSSProperties = {
  backgroundColor: 'white',
  cursor: 'move',
}

export interface CardProps {
  id: string
  title: string
  moveCard: (id: string, to: number) => void
  findCard: (id: string) => { index: number }
}

interface Item {
  id: string
  originalIndex: number
}

export const MotoRouteEditorWaypointDraggable: FC<CardProps> = memo(function Card({
  id,
  title,
  moveCard,
  findCard,
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
                      {/* { index === 0 && (
                          <span>Start of the route</span>
                      )}
                      { index === route.length-1 && route.length > 1 && (
                          <span>End of the route</span>
                      )}
                      { index !== 0 && index !== route.length-1 && (
                          <span>Waypoint {index}</span>
                      )} */}
                      { title }
                      {/* <span className="remove-waypoint" onClick={() => removeWaypoint(index)}><TrashFill /></span> */}
                  </h5>
              </div>
              <div className="description-collapsible">
                  {/* <p>Latitude: {waypoint.lat.toFixed(2)} Longitude: {waypoint.lng.toFixed(2)}</p> */}
              </div>
          </div>
      </div>
      <span className="noselect">{id}asdasd</span>
    </div>
  )
})
