import React, { Fragment, useCallback, useState } from "react"
import { TrashFill } from "react-bootstrap-icons";
import update from 'immutability-helper'

import { useDrop } from 'react-dnd'

import "./MotoRouteEditor.scss"
import { MotoRouteEditorWaypointDraggable, getWaypointDraggableId } from "./MotoRouteEditorWaypointDraggable";

type MotoRouteEditorRouteTabProps = {
    route: {lat: number, lng: number}[];
    removeWaypoint: (index: number) => void;
}
const ITEMS = [
    {
      lat: 10,
      lng: 30,
      text: 'Write a cool JS library',
    },
    {
      lat: 20,
      lng: 30,
      text: 'Make it generic enough',
    },
    {
      lat: 40,
      lng: 50,
      text:'Write README',
    },
    {
      lat: 50,
      lng: 60,
      text: 'Create some examples',
    },
    {
      lat: 60,
      lng: 70,
      text: 'Spam in Twitter and IRC to promote it',
    },
    {
      lat: 70,
      lng: 80,
      text: '???',
    },
    {
      lat: 90,
      lng: 100,
      text: 'PROFIT',
    },
  ]
  
const MotoRouteEditorRouteTab = (props: MotoRouteEditorRouteTabProps) => {
    const { route, removeWaypoint } = props


    const [cards, setCards] = useState(ITEMS)

    const findCard = useCallback((id: string) => {
      const card = cards.filter((c) => `${getWaypointDraggableId(c)}` === id)[0]
      return {
      card,
      index: cards.indexOf(card),
    }}, [cards],)
    
    const moveCard = useCallback((id: string, atIndex: number) => {
      const { card, index } = findCard(id)
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        }),
      )
    },[findCard, cards, setCards], )
    
    const [, drop] = useDrop(() => ({ accept: 'card' }))


    const generateCardTitle = (index: number): string => {
      if (index === 0) {
        return "Start of the route"
      } else if (index == ITEMS.length-1) {
        return "End of the route"
      } else {
        return `Waypoint ${index}`
      }
    }

    return (
        <div ref={drop} className="moto-route-editor-waypoints">
            <h2>Route waypoints</h2>

            { route.length < 1 && (
                <h4>Click on the map to route waypoints and create the route</h4>
            )}

            { route.length >= 1 && (
                <Fragment>

                    {cards.map((card, index) => (
                        <MotoRouteEditorWaypointDraggable
                            key={getWaypointDraggableId(card)}
                            id={getWaypointDraggableId(card)}
                            index={index}
                            title={generateCardTitle(index)}
                            moveCard={moveCard}
                            findCard={findCard}
                            removeWaypoint={removeWaypoint}
                        />
                    ))}
                </Fragment>
            )}
        </div>
    )
}

export default MotoRouteEditorRouteTab;