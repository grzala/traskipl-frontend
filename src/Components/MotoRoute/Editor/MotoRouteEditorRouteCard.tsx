import React, { Fragment, useCallback, useState } from "react"
import { TrashFill } from "react-bootstrap-icons";
import update from 'immutability-helper'

import { useDrop } from 'react-dnd'

import "./MotoRouteEditor.scss"
import { Card } from "./Card";

type MotoRouteEditorRouteCardProps = {
    route: {lat: number, lng: number}[];
    removeWaypoint: (index: number) => void;
}
const ITEMS = [
    {
      id: 1,
      text: 'Write a cool JS library',
    },
    {
      id: 2,
      text: 'Make it generic enough',
    },
    {
      id: 3,
      text: 'Write README',
    },
    {
      id: 4,
      text: 'Create some examples',
    },
    {
      id: 5,
      text: 'Spam in Twitter and IRC to promote it',
    },
    {
      id: 6,
      text: '???',
    },
    {
      id: 7,
      text: 'PROFIT',
    },
  ]
const MotoRouteEditorRouteCard = (props: MotoRouteEditorRouteCardProps) => {
    const { route, removeWaypoint } = props


    const [cards, setCards] = useState(ITEMS)

    const findCard = useCallback(
        (id: string) => {
          const card = cards.filter((c) => `${c.id}` === id)[0]
          return {
            card,
            index: cards.indexOf(card),
          }
        },
        [cards],
      )
    
      const moveCard = useCallback(
        (id: string, atIndex: number) => {
          const { card, index } = findCard(id)
          setCards(
            update(cards, {
              $splice: [
                [index, 1],
                [atIndex, 0, card],
              ],
            }),
          )
        },
        [findCard, cards, setCards],
      )
    
      const [, drop] = useDrop(() => ({ accept: 'card' }))

    return (
        <div ref={drop} className="moto-route-editor-waypoints">
            <h2>Route waypoints</h2>

            { route.length < 1 && (
                <h4>Click on the map to route waypoints and create the route</h4>
            )}

            { route.length >= 1 && (
                <Fragment>

                    {cards.map((card, index) => (
                        <Card
                            key={card.id}
                            id={`${card.id}`}
                            text={card.text}
                            moveCard={moveCard}
                            findCard={findCard}
                        />
                    ))}
                    {/* {route.map((waypoint, index) => (
                        <div
                            {(node: any) => drag(drop(node))} // For drag and drop
                            key={`waypoint_${index}`}
                            id={`waypoint_${index}`}
                            className={`list-group-item flex-column align-items-start`}
                            >

                            <div className="d-flex flex-row">
                                <div className="description-container d-flex flex-column">

                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="waypoint-title">
                                            { index === 0 && (
                                                <span>Start of the route</span>
                                            )}
                                            { index === route.length-1 && route.length > 1 && (
                                                <span>End of the route</span>
                                            )}
                                            { index !== 0 && index !== route.length-1 && (
                                                <span>Waypoint {index}</span>
                                            )}

                                            <span className="remove-waypoint" onClick={() => removeWaypoint(index)}><TrashFill /></span>
                                        </h5>
                                    </div>
                                    <div className="description-collapsible">
                                        <p>Latitude: {waypoint.lat.toFixed(2)} Longitude: {waypoint.lng.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))} */}
                </Fragment>
            )}
        </div>
    )
}

export default MotoRouteEditorRouteCard;