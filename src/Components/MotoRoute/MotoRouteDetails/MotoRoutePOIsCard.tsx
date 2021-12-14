import React, { Fragment, useCallback } from "react";
import { MotoRouteType, POIType } from "../../../Types/MotoRoutesTypes";
import { mapIconCirclesUrls } from "../../MapConstants";

import "./MotoRoutePOIsCard.scss"

type MotoRoutePOIsCardProps = {
    route: MotoRouteType;
    selectedPOI: POIType | null;
    onPOIHover: (enter: boolean, poi: POIType) => void;
    onPOISelect: (poi: POIType) => void;
}


const MotoRoutePOIsCard = (props: MotoRoutePOIsCardProps) => {
    const { route, onPOIHover, onPOISelect, selectedPOI} = props;

    const onClickListItem = (e: any, newPoi: POIType) => {
        e.preventDefault();
        
        // when changing selected POI, make sure the scroll is reset on previously chosen element
        if (selectedPOI) {
            var element = document.getElementById(`poi_${selectedPOI.id}`)
            console.log("element");
            console.log(element);
            document.getElementById(`poi_${selectedPOI.id}`)?.scroll(0, 0);
        }
        onPOISelect(newPoi)
    }

    const isSelectedPOI = useCallback((id: number) => {
        return selectedPOI?.id === id;
    }, [selectedPOI])


    return  route.point_of_interests && route.point_of_interests.length > 0 ? 
    (
        <Fragment>
            <div className="list-group poi-list">
                {route.point_of_interests.map((poi) => (
                    <a 
                        key={`poi_${poi.id}`}
                        id={`poi_${poi.id}`}
                        href="/#"
                        onMouseEnter={() => onPOIHover(true, poi)} 
                        onMouseLeave={() => onPOIHover(false, poi)} 
                        className={`list-group-item list-group-item-${isSelectedPOI(poi.id) ? "selected" : "collapsed"} flex-column align-items-start`}
                        onClick={(e) => onClickListItem(e, poi)}>



                        <div className="d-flex flex-row">
                            <div className="icon-container">
                                <img className="map-icon" alt="map-icon" src={ mapIconCirclesUrls[poi.variant] } />
                            </div>
                            <div className="description-container d-flex flex-column">

                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="">{poi.name}</h5>
                                </div>
                                <div className="description-collapsible">
                                    <p className={`description ${isSelectedPOI(poi.id) ? "" : "collapsed"}`}>{poi.description}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

        </Fragment>
    ) : 
    (
        <Fragment>
            <h3>There are no points of interest to display</h3>
        </Fragment>
    )
}

export default MotoRoutePOIsCard;