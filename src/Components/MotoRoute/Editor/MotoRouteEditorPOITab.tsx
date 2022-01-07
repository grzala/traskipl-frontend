import React, { Fragment, useCallback, useState } from "react"
import { TrashFill } from "react-bootstrap-icons";
import update from 'immutability-helper'

import { useDrop } from 'react-dnd'

import "./MotoRouteEditor.scss"
import { MotoRouteEditorPOIDraggable } from "./MotoRouteEditorPOIDraggable";
import { POIType, POIVariant } from "src/Types/MotoRoutesTypes";

type MotoRouteEditorPOITabProps = {
  pois: POIType[]
  setPois: (_: POIType[]) => void
}

const MotoRouteEditorPOITab = (props: MotoRouteEditorPOITabProps) => {
    const { pois, setPois } = props

    const findCard = useCallback((id: string) => {
      const card = pois.filter((c) => `${c.id}` === id)[0]
      return {
      card,
      index: pois.indexOf(card),
    }}, [pois],)
    
    const moveCard = useCallback((id: string, atIndex: number) => {
      const { card, index } = findCard(id)
      setPois(
        update(pois, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        }),
      )
    },[findCard, pois, setPois], )
    
    const [, drop] = useDrop(() => ({ accept: 'card' }))

    return (
        <div ref={drop} className="moto-route-editor-poi-list">
            <h2>Route waypoints</h2>

            { pois.length < 1 && (
                <h4>Click on the map to add points of interest</h4>
            )}

            { pois.length >= 1 && (
                <Fragment>

                    {pois.map((poi, index) => (
                        <MotoRouteEditorPOIDraggable
                            key={ poi.id }
                            id={ `${poi.id}` }
                            poi={ poi }
                            isSelected={ false }
                            moveCard={ moveCard }
                            findCard={ findCard }
                        />
                    ))}
                </Fragment>
            )}
        </div>
    )
}

export default MotoRouteEditorPOITab;