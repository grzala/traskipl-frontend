import React, { Fragment, useCallback, useState } from "react"
import { TrashFill } from "react-bootstrap-icons";
import update from 'immutability-helper'

import { useDrop } from 'react-dnd'

import "./MotoRouteEditor.scss"
import { MotoRouteEditorPOIDraggable } from "./MotoRouteEditorPOIDraggable";

type MotoRouteEditorPOITabProps = {
  
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
const MotoRouteEditorPOITab = (props: MotoRouteEditorPOITabProps) => {
    const { } = props


    const [cards, setCards] = useState(ITEMS)

    const findCard = useCallback((id: string) => {
      const card = cards.filter((c) => `${c.id}` === id)[0]
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

    return (
        <div ref={drop} className="moto-route-editor-waypoints">
            <h2>Route waypoints</h2>

            { cards.length < 1 && (
                <h4>Click on the map to add points of interest</h4>
            )}

            { cards.length >= 1 && (
                <Fragment>

                    {cards.map((card, index) => (
                        <MotoRouteEditorPOIDraggable
                            key={card.id}
                            id={`${card.id}`}
                            text={card.text}
                            moveCard={moveCard}
                            findCard={findCard}
                        />
                    ))}
                </Fragment>
            )}
        </div>
    )
}

export default MotoRouteEditorPOITab;