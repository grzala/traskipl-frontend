import React, { Fragment } from "react";
import { MotoRouteType } from "../../../Types/MotoRoutesTypes";

import "./MotoRouteDetailsTab.scss"

type MotoRouteDetailsTabProps = {
    route: MotoRouteType;
    poiMarkerFilter: boolean;
    poiMarkerFilterChange: (newFilterVal: boolean) => void;
}

const MotoRouteDetailsTab = (props: MotoRouteDetailsTabProps) => {
    const { route, poiMarkerFilter, poiMarkerFilterChange} = props;


    return (
        <Fragment>
            Markers: <input 
                            key="PoIFilterCheck" 
                            type="checkbox" 
                            onChange={() => poiMarkerFilterChange(!poiMarkerFilter)} 
                            checked={poiMarkerFilter} 
                            className="filter-checkbox" 
                        />
            {/* Accidents: <input key="PoIFilterCheck" type="checkbox" onChange={onChange} checked={poiMarkerFilter} className="" /> */}
            

            <h2>{route.name}</h2>
            <p>{route.description}</p>

            {route.open_all_year && (
                <p><b>Open all year</b></p>
            )}
            {!route.open_all_year && (
                <p>
                    <b>Open from: </b> {route.date_open_day}/{route.date_open_month}
                    &nbsp;&#45;&nbsp;{route.date_closed_day}/{route.date_closed_month}
                </p>
            )}
            <p><b>Difficulty:</b> {route.difficulty}/10</p>
            <p><b>Time to complete:</b> {route.time_to_complete_h > 0 ? route.time_to_complete_h.toString() + "h" : ""} {route.time_to_complete_m}m </p>
            <p><b>Route length:</b> {route.distance.toFixed(2)} km</p>

        </Fragment>
    )
}

export default MotoRouteDetailsTab;