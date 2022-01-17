import React, { Fragment } from "react";
import { AccidentType } from "src/Types/AccidentTypes";
import { MotoRouteType } from "../../../Types/MotoRoutesTypes";
import ReactLoading from "react-loading";


import "./MotoRouteAccidentsTab.scss"

type MotoRouteAccidentsTabProps = {
    accidents: AccidentType[];
    loadingAccidents: boolean;
    onAccidentHover: (hover: boolean, accident: AccidentType) => void,
}

const MotoRouteAccidentsTab = (props: MotoRouteAccidentsTabProps) => {
    const { accidents, loadingAccidents, onAccidentHover } = props;

    if (accidents && accidents.length > 0) {
        return  (
            <Fragment>
                <small>Accident locations are only as accurate as provided by SEWIK</small>
                <h5>Injuries to the motorcyclist: </h5>
                <ul>
                    <li>Gray - no injury</li>
                    <li>Yellow - light injury</li>
                    <li>Red - heavy injury</li>
                    <li>Black - death</li>
                </ul>

                {accidents.map((accident) => (
                    <div 
                        className={`list-group-item flex-column align-items-start`}
                        onMouseEnter={() => onAccidentHover(true, accident)} 
                        onMouseLeave={() => onAccidentHover(false, accident)} 
                        >

                        <div className="d-flex flex-row">
                            <div className="description-container d-flex flex-column">

                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="waypoint-title">
                                        { accident.date } 
                                    </h5>
                                </div>
                                <div className="description-collapsible">
                                    <p>Injuries to motorcyclist: { accident.injury.toLowerCase() }</p>
                                    <p>Latitude: {accident.coordinates.lat.toFixed(2)} Longitude: {accident.coordinates.lng.toFixed(2)}</p>
                                    <p><a target="_blank" href={`http://sewik.pl/accident/${accident.original_id}`}>Click for more information</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </Fragment>
        )
    } else if (loadingAccidents) {
        return (
            <div className="vertical-align-placeholder">
                <ReactLoading type={ 'spokes' } className="loading-placeholder" />
            </div>
        )
    } else {
        return (
            <Fragment>
                <h3>There are no accidents to to display</h3>
            </Fragment>
        )
    }
}

export default MotoRouteAccidentsTab;