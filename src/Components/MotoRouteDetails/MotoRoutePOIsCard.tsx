import React, { Fragment } from "react";
import { pipeline } from "stream";
import { MotoRouteType } from "../../Types/MotoRoutesTypes";
import { mapIconCirclesUrls } from "../MapConstants";

import "./MotoRouteDetails.scss"

type MotoRoutePOIsCardProps = {
    route: MotoRouteType
}

const MotoRoutePOIsCard = (props: MotoRoutePOIsCardProps) => {
    const { route } = props;


    return  route.points_of_interest && route.points_of_interest.length > 0 ? 
    (
        <Fragment>

            <div className="list-group poi-list">
                {route.points_of_interest.map((poi) => (
                    <a href="#?poi" className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="row">
                            <div className="col-md-2">
                                <img className="map-icon" alt="map-icon" src={ mapIconCirclesUrls[poi.variant] } />
                            </div>
                            <div className="col-md-10">

                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="">{poi.name}</h5>
                                </div>
                                <p className="description">{poi.description}</p>
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