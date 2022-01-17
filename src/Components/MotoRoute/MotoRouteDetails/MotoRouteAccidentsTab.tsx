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

                Motocard

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