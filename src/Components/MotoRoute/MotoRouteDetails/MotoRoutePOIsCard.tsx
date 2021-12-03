import React, { Fragment, useCallback, useState } from "react";
import { MotoRouteType } from "../../../Types/MotoRoutesTypes";
import { mapIconCirclesUrls } from "../../MapConstants";

import "./MotoRoutePOIsCard.scss"

type MotoRoutePOIsCardProps = {
    route: MotoRouteType;
    onPOIHover: (enter: boolean, route_id: string) => void;
}


const MotoRoutePOIsCard = (props: MotoRoutePOIsCardProps) => {
    const { route, onPOIHover} = props;

    const [selectedPOI, setselectedPOI] = useState<string | null>(null);

    const isSelectedPOI = useCallback((id: string) => {
        return selectedPOI == id;
    }, [selectedPOI])

    return  route.points_of_interest && route.points_of_interest.length > 0 ? 
    (
        <Fragment>
            <div className="list-group poi-list">
                {route.points_of_interest.map((poi) => (
                    <a 
                        key={`poi_${poi._id}`}
                        onMouseEnter={() => onPOIHover(true, poi._id)} 
                        onMouseLeave={() => onPOIHover(false, poi._id)} 
                        className={`list-group-item flex-column align-items-start`}
                        onClick={() => setselectedPOI(poi._id)}
                        style={{
                            maxHeight: isSelectedPOI(poi._id) ? '20em' : '6.7em',
                        }}>



                        <div className="d-flex flex-row">
                            <div className="icon-container">
                                <img className="map-icon" alt="map-icon" src={ mapIconCirclesUrls[poi.variant] } />
                            </div>
                            <div className="description-container d-flex flex-column">

                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="">{poi.name}</h5>
                                </div>
                                <div className="description-collapsible">
                                    <p className="description collapsed">{poi.description}</p>
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