import moment from "moment";
import React, { Fragment } from "react";
import { MotoRouteType } from "../../../Types/MotoRoutesTypes";

import "./MotoRouteDetailsTab.scss"

type MotoRouteDetailsTabProps = {
    route: MotoRouteType;
    poiMarkerFilter: boolean;
    poiMarkerFilterChange: (newFilterVal: boolean) => void;
    accidentMarkerFilter: boolean;
    setAccidentMarkerFilter: (_: boolean) => void
}

const MotoRouteDetailsTab = (props: MotoRouteDetailsTabProps) => {
    const { route, poiMarkerFilter, poiMarkerFilterChange, accidentMarkerFilter, setAccidentMarkerFilter} = props;


    return (
        <Fragment>
            <ul style={{listStyleType: "none", paddingLeft: "0"}}>
                <li>
                Display points of interests: <input 
                            key="PoIFilterCheck" 
                            type="checkbox" 
                            onChange={() => poiMarkerFilterChange(!poiMarkerFilter)} 
                            checked={poiMarkerFilter} 
                            className="filter-checkbox" 
                        />
            </li>
            <li>
                Display accidents: <input 
                            key="AccidentsFilterCheck" 
                            type="checkbox" 
                            onChange={() => setAccidentMarkerFilter(!accidentMarkerFilter)} 
                            checked={accidentMarkerFilter} 
                            className="filter-checkbox" 
                        />
            </li>
            </ul>
            

            <h2>{route.name}</h2>
            <p>{route.description}</p>

            {route.open_all_year && (
                <p><b>Open all year</b></p>
            )}
            {!route.open_all_year && (
                <p>
                    <b>Open between: </b> {route.date_open_day}/{route.date_open_month}
                    &nbsp;&#45;&nbsp;{route.date_closed_day}/{route.date_closed_month}
                </p>
            )}
            <p><b>Difficulty:</b> {route.difficulty}/10</p>
            <p><b>Time to complete:</b> {route.time_to_complete_h > 0 ? route.time_to_complete_h.toString() + "h" : ""} {route.time_to_complete_m}m </p>
            <p><b>Route length:</b> {route.distance.toFixed(2)} km</p>
            <p><b>Date added:</b> {moment(route.created_at).format("D/M/YYYY")}</p>

        </Fragment>
    )
}

export default MotoRouteDetailsTab;