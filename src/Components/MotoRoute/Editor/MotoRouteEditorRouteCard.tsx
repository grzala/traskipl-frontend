import React, { Fragment } from "react"
import { TrashFill } from "react-bootstrap-icons";
import { Route } from "react-router-dom";

import "./MotoRouteEditor.scss"

type MotoRouteEditorRouteCardProps = {
    route: {lat: number, lng: number}[];
    removeWaypoint: (index: number) => void;
}

const MotoRouteEditorRouteCard = (props: MotoRouteEditorRouteCardProps) => {
    const { route, removeWaypoint } = props

    return (
        <div className="moto-route-editor-waypoints">
            <h2>Route waypoints</h2>

            { route.length < 1 && (
                <h4>Click on the map to route waypoints and create the route</h4>
            )}

            { route.length >= 1 && (
                <Fragment>
                    {route.map((waypoint, index) => (
                        <div
                            key={`waypoint_${index}`}
                            id={`waypoint_${index}`}
                            className={`list-group-item flex-column align-items-start`}
                            >

                            <div className="d-flex flex-row">
                                <div className="description-container d-flex flex-column">

                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="waypoint-title">
                                            { index === 0 && (
                                                <span>Start of the route</span>
                                            )}
                                            { index === route.length-1 && route.length > 1 && (
                                                <span>End of the route</span>
                                            )}
                                            { index !== 0 && index !== route.length-1 && (
                                                <span>Waypoint {index}</span>
                                            )}

                                            <span className="remove-waypoint" onClick={() => removeWaypoint(index)}><TrashFill /></span>
                                        </h5>
                                    </div>
                                    <div className="description-collapsible">
                                        <p>Latitude: {waypoint.lat.toFixed(2)} Longitude: {waypoint.lng.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Fragment>
            )}
        </div>
    )
}

export default MotoRouteEditorRouteCard;