import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { MotoRouteType } from "../../Types/MotoRoutesTypes";
import { mapIconCirclesUrls } from "../MapConstants";
import HelmetRating from "./MotoRouteDetails/HelmetRating";

import "./MotoRoutesList.scss"

type MotoRoutesListProps = {
    motoRoutesList: MotoRouteType[];
}

const MotoRoutesList = (props: MotoRoutesListProps) => {
    const { motoRoutesList } = props

    return(
        <Fragment>
            <div className="moto-routes-list list-group">
                <div className="list-group-item list-group-item-action active">
                    Other routes in the area
                </div>
                
                <div className="moto-routes-list-main">
                    { motoRoutesList && motoRoutesList.length > 0 ? (
                            <Fragment>
                            { motoRoutesList.map((route) => 
                                <Link key={`moto-list-item-${route.id}`} to={`/routes/${route.id}/details`} className="moto-routes-list-item list-group-item list-group-item-action">
                                    <div className="row">
                                        <div className="map-thumbnail-rating-col">
                                            <img src={ process.env.PUBLIC_URL + '/samples/map1.png' } alt="map of the route" />
                                            <HelmetRating
                                                score={ route.score }
                                                size={ 1.4 }
                                                spacing={ 0.15 }
                                                overrideMainColor={ "#bd3327" }
                                            />

                                            <img className="map-icon" alt="map-icon" src={ mapIconCirclesUrls["FOOD"] } />: 1&nbsp;
                                            <img className="map-icon" alt="map-icon" src={ mapIconCirclesUrls["VISTA"] } />: 2&nbsp;
                                            <img className="map-icon" alt="map-icon" src={ mapIconCirclesUrls["URBEX"] } />: 1&nbsp;
                                            <img className="map-icon" alt="map-icon" src={ mapIconCirclesUrls["DANGER"] } />: 2&nbsp;
                                            <img className="map-icon" alt="map-icon" src={ mapIconCirclesUrls["FUEL"] } />: 1&nbsp;
                                            <img className="map-icon" alt="map-icon" src={ mapIconCirclesUrls["OTHER"] } />: 2&nbsp;
                                        </div>

                                        <div className="col-sm-7">
                                            <p>{ route.name }</p>
                                            <p className="moto-routes-list-item-description">{ route.description }</p>
                                        </div>
                                    </div>
                                </Link>
                            )}
                            </Fragment>
                    ) : (
                        <div className="moto-routes-list-item list-group-item text-center">
                            <h3>No routes to show</h3>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default MotoRoutesList;