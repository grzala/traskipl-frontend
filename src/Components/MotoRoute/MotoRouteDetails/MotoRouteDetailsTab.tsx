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

        </Fragment>
    )
}

export default MotoRouteDetailsTab;