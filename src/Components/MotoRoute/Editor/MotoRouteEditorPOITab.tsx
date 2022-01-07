import React, { Fragment, useCallback, useEffect, useState } from "react"
import { TrashFill } from "react-bootstrap-icons";
import update from 'immutability-helper'

import { useDrop } from 'react-dnd'

import "./MotoRouteEditor.scss"
import { MotoRouteEditorPOIDraggable } from "./MotoRouteEditorPOIDraggable";
import { POIType, POIVariant } from "src/Types/MotoRoutesTypes";

type MotoRouteEditorPOITabProps = {
  pois: POIType[]
  setPois: (_: POIType[]) => void
  selectedPOI: POIType | null
  onPOISelect: (poi: POIType | null) => void
  onPOIHover: (mouseenter: boolean, poi: POIType) => void
  handlePOIDetailsChange: (id: number, field: string, value: any) => void
}

const MotoRouteEditorPOITab = (props: MotoRouteEditorPOITabProps) => {
    const { pois, setPois, selectedPOI, onPOISelect, onPOIHover, handlePOIDetailsChange } = props

    const findCard = useCallback((id: string) => {
      const card = pois.filter((c) => `poi_${c.id}` === id)[0]
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

    useEffect(() => {
      // When selecting POI scroll so that it is visible
      let poiHTMLElem = document.getElementById(`poi_${selectedPOI?.id}`)

      if (poiHTMLElem) {
          document.getElementById(`poi-list`)?.scroll({
              top: poiHTMLElem.offsetTop - 10,
              left: 0,
              behavior: 'smooth'
          });
      }
  }, [selectedPOI])

    return (
        <div ref={drop} className="moto-route-editor-poi-list">
            <h2>Points of interest</h2>

            { pois.length < 1 && (
                <h4>Click on the map to add points of interest</h4>
            )}

            { pois.length >= 1 && (
                <Fragment>
                    <small>Click anywhere on the map to add points of interest</small>

                    {pois.map((poi, index) => (
                        <MotoRouteEditorPOIDraggable
                            key={ poi.id }
                            id={ `poi_${poi.id}` }
                            poi={ poi }
                            isSelected={ selectedPOI?.id === poi.id }
                            moveCard={ moveCard }
                            findCard={ findCard }
                            onClick={ () => onPOISelect(poi)}
                            onPOIHover={ onPOIHover }
                            handlePOIDetailsChange={ handlePOIDetailsChange }
                        />
                    ))}
                </Fragment>
            )}
        </div>
    )
}

export default MotoRouteEditorPOITab;