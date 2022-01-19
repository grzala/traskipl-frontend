import React, { Fragment, useCallback } from "react"
import update from 'immutability-helper'

import { useDrop } from 'react-dnd'

import "./MotoRouteEditor.scss"
import { MotoRouteEditorWaypointDraggable, getWaypointDraggableId } from "./MotoRouteEditorWaypointDraggable";

type MotoRouteEditorRouteTabProps = {
    route: {lat: number, lng: number}[];
    setRoute: (_: {lat: number, lng: number}[]) => void;
    removeWaypoint: (index: number) => void;
    onWaypointHover: (enter: boolean, index: number) => void
}
  
const MotoRouteEditorRouteTab = (props: MotoRouteEditorRouteTabProps) => {
    const { route, setRoute, removeWaypoint, onWaypointHover } = props


    const findCard = useCallback((id: string) => {
      const card = route.filter((c) => `${getWaypointDraggableId(c)}` === id)[0]
      return {
      card,
      index: route.indexOf(card),
    }}, [route],)
    
    const moveCard = useCallback((id: string, atIndex: number) => {
      const { card, index } = findCard(id)
      setRoute(
        update(route, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        }),
      )
    },[findCard, route, setRoute], )
    
    const [, drop] = useDrop(() => ({ accept: 'card' }))


    const generateCardTitle = (index: number): string => {
      if (index === 0) {
        return "Start of the route"
      } else if (index === route.length-1) {
        return "End of the route"
      } else {
        return `Waypoint ${index}`
      }
    }

    return (
        <div ref={drop} className="moto-route-editor-waypoints">
            <h2>Route waypoints</h2>

            { route.length < 1 && (
                <h4>Click on the map to add route waypoints and create the route</h4>
            )}

            { route.length >= 1 && (
                <Fragment>
                    <small>Click anywhere on the map to add waypoints</small>
                    
                    {route.map((waypoint, index) => (
                        <MotoRouteEditorWaypointDraggable
                            key={ getWaypointDraggableId(waypoint) }
                            id={ getWaypointDraggableId(waypoint) }
                            index={ index }
                            title={ generateCardTitle(index) }
                            moveCard={ moveCard }
                            findCard={ findCard }
                            removeWaypoint={ removeWaypoint }
                            waypoint={ waypoint }
                            onHover={ onWaypointHover }
                        />
                    ))}
                </Fragment>
            )}
        </div>
    )
}

export default MotoRouteEditorRouteTab;