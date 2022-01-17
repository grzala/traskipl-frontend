import React, { Fragment } from "react";
import { AccidentType } from "src/Types/AccidentTypes";
import { MotoRouteType } from "../../../Types/MotoRoutesTypes";
import ReactLoading from "react-loading";

type MotoRouteAccidentsTabProps = {
    accidents: AccidentType[];
    loadingAccidents: boolean;
}

const MotoRouteAccidentsTab = (props: MotoRouteAccidentsTabProps) => {
    const { accidents, loadingAccidents } = props;

    if (accidents && accidents.length > 0) {
        return  (
            <Fragment>

                {accidents.map((accident) => (
                    <div className={`list-group-item flex-column align-items-start`}>
                        <div className="d-flex flex-row">
                            <div className="description-container d-flex flex-column">

                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="waypoint-title">
                                        { "yoyo" }
                                    </h5>
                                </div>
                                <div className="description-collapsible">
                                    <p>Latitude: {accident.coordinates.lat.toFixed(2)} Longitude: {accident.coordinates.lng.toFixed(2)}</p>
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