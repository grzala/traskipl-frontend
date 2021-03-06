import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

import { MotoRouteType, POIVariant } from "../../Types/MotoRoutesTypes";
import { mapIconCirclesUrls } from "../MapConstants";
import HelmetRating from "./MotoRouteDetails/HelmetRating";

import "./MotoRoutesList.scss"

type MotoRoutesListProps = {
    routes: MotoRouteType[];
    isLoading: boolean;
    title: string;
    onHover?: (enter: boolean, route_id: number) => void
}

const MotoRoutesList = (props: MotoRoutesListProps) => {
    const { routes, isLoading, title, onHover } = props

    const poi_count_build_tsx = (poi_count: {[variant in POIVariant]: number}) => {
        let toReturn = [];
        if (poi_count !== undefined) {

            var total_iterations = 0
            for (let variant in POIVariant) {
                var count = 0
                if (poi_count[variant as POIVariant]) 
                    count = poi_count[variant as POIVariant]
                toReturn.push(
                    <Fragment key={total_iterations}>
                        {/* Capitalised enum as icon tooltip */}
                        <img title={`${variant.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase()})}`} 
                            className="map-icon" 
                            alt="map-icon" 
                            src={ mapIconCirclesUrls[variant] } 
                            />
                            &thinsp;{ count }&nbsp;
                        {/* Add spaces if number is one digit */}
                        { count < 10 ? <Fragment>&nbsp;&nbsp;</Fragment> : "" }
                    </Fragment>
                )
                total_iterations += 1
            }
            
            return toReturn

        } else {
            throw new Error("Error: poi_count is undefined")
        }
            
    }

    return (
        <Fragment>
            <div className="list-group moto-routes-list">
                <div className="list-group-item active">
                    { title }
                </div>
                
                <div className="moto-routes-list-main">
                    { isLoading && (
                        <ReactLoading type={ 'spokes' } className="loading-placeholder" />
                    )}

                    { !isLoading && routes && routes.length > 0 &&  (
                            <Fragment>
                            { routes.map((route) => 
                                <Link
                                    key={`moto-list-item-${route.id}`} 
                                    to={`/routes/${route.id}/details`} 
                                    className="moto-routes-list-item list-group-item list-group-item-action"
                                    onMouseEnter={
                                        () => {
                                            if (onHover !== undefined) {
                                                onHover(true, route.id)
                                            }
                                        }
                                    }
                                    onMouseLeave={
                                        () => {
                                            if (onHover !== undefined) {
                                                onHover(false, route.id)
                                            }
                                        }
                                    }
                                    >
                                    <div className="d-flex flex-row">
                                        <div className="map-thumbnail-rating-col">
                                            <img src={ route.thumbnail_url } alt="map of the route" />

                                            <div className="helmet-rating-container">
                                                <HelmetRating
                                                    score={ route.score }
                                                    size={ 1.5 }
                                                    spacing={ 0.3 }
                                                    overrideMainColor={ "#bd3327" }
                                                />
                                            </div>

                                            <div className="poi-count-container">
                                                { route.poi_count !== undefined && (
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
                    )}
                    { !isLoading && (!routes || routes.length <= 0) && (
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