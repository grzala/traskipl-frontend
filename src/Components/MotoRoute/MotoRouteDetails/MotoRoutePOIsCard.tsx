import React, { Fragment, useCallback } from "react";
import { MotoRouteType } from "../../../Types/MotoRoutesTypes";
import { mapIconCirclesUrls } from "../../MapConstants";

import "./MotoRoutePOIsCard.scss"

type MotoRoutePOIsCardProps = {
    route: MotoRouteType;
    selectedPOI: string | null;
    onPOIHover: (enter: boolean, poi_id: string) => void;
    onPOISelect: (poi_id: string) => void;
}


const MotoRoutePOIsCard = (props: MotoRoutePOIsCardProps) => {
    const { route, onPOIHover, onPOISelect, selectedPOI} = props;

    const onClickListItem = (e: any, newPoiId: string) => {
        e.preventDefault();
        
        // when changing selected POI, make sure the scroll is reset on previously chosen element
        if (selectedPOI) {
            document.getElementById(`poi_${selectedPOI}`)?.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
              });
        }
        onPOISelect(newPoiId)
    }

    const isSelectedPOI = useCallback((id: string) => {
        return selectedPOI === id;
    }, [selectedPOI])


    return  route.points_of_interest && route.points_of_interest.length > 0 ? 
    (
        <Fragment>
            <div className="list-group poi-list">
                {route.points_of_interest.map((poi) => (
                    <a 
                        key={`poi_${poi._id}`}
                        id={`poi_${poi._id}`}
                        onMouseEnter={() => onPOIHover(true, poi._id)} 
                        onMouseLeave={() => onPOIHover(false, poi._id)} 
                        className={`list-group-item list-group-item-${isSelectedPOI(poi._id) ? "selected" : "collapsed"} flex-column align-items-start`}
                        onClick={(e) => onClickListItem(e, poi._id)}>



                        <div className="d-flex flex-row">
                            <div className="icon-container">
                                <img className="map-icon" alt="map-icon" src={ mapIconCirclesUrls[poi.variant] } />
                            </div>
                            <div className="description-container d-flex flex-column">

                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="">{poi.name}</h5>
                                </div>
                                <div className="description-collapsible">
                                    <p className={`description ${isSelectedPOI(poi._id) ? "" : "collapsed"}`}>{poi.description}</p>
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