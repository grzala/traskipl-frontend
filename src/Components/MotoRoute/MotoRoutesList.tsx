import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { MotoRouteType, POIVariant } from "../../Types/MotoRoutesTypes";
import { mapIconCirclesUrls } from "../MapConstants";
import HelmetRating from "./MotoRouteDetails/HelmetRating";

import "./MotoRoutesList.scss"

type MotoRoutesListProps = {
    motoRoutesList: MotoRouteType[];
}

const MotoRoutesList = (props: MotoRoutesListProps) => {
    const { motoRoutesList } = props

    const poi_count_build_tsx = (poi_count: {[variant in POIVariant]: number}) => {
        let toReturn = [];
        if (poi_count != undefined) {

            for (let variant in POIVariant) {
                var count = 0
                if (poi_count[variant as POIVariant]) 
                    count = poi_count[variant as POIVariant]
                toReturn.push(
                    <Fragment>
                        <img className="map-icon" alt="map-icon" src={ mapIconCirclesUrls[variant] } />&thinsp;{ count }&nbsp;
                        { count < 10 ? <Fragment>&nbsp;&nbsp;</Fragment> : "" }
                    </Fragment>
                )
            }
            
            return toReturn

        } else {
            throw "Error: poi_count is undefined"
        }
            
    }

    return(
        <Fragment>
                <div className="list-group moto-routes-list">
                    <div className="list-group-item active">
                        Other routes in the area
                    </div>
                    
                    <div className="moto-routes-list-main">
                        { motoRoutesList && motoRoutesList.length > 0 ? (
                                <Fragment>
                                { motoRoutesList.map((route) => 
                                    <Link key={`moto-list-item-${route.id}`} to={`/routes/${route.id}/details`} className="moto-routes-list-item list-group-item list-group-item-action">
                                        <div className="d-flex flex-row">
                                            <div className="map-thumbnail-rating-col">
                                                <img src={ process.env.PUBLIC_URL + '/samples/map1.png' } alt="map of the route" />

                                                <div className="helmet-rating-container">
                                                    <HelmetRating
                                                        score={ route.score }
                                                        size={ 1.5 }
                                                        spacing={ 0.3 }
                                                        overrideMainColor={ "#bd3327" }
                                                    />
                                                </div>

                                                <div className="poi-count-container">
                                                    {() => console.log(route.poi_count)}
                                                    { route.poi_count != undefined && (
                                                    poi_count_build_tsx(route.poi_count)
                                                    )}
                                                </div>
                                            </div>

                                            <div className="info-col">
                                                <h5>{ route.name }</h5>
                                                <hr />
                                                <p className="info">{ route.description }</p>
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