import React, { Fragment } from "react";
import { GeoAltFill, InfoCircleFill, MapFill } from "react-bootstrap-icons";
import { NavLink, Route, Routes, useMatch } from "react-router-dom";
import { POIType } from "src/Types/MotoRoutesTypes";
import MotoRouteEditorDetailsTab from "./MotoRouteEditorDetailsTab";
import MotoRouteEditorPOITab from "./MotoRouteEditorPOITab";
import MotoRouteEditorRouteTab from "./MotoRouteEditorRouteTab";


type MotoRouteDetailsEditorProps = {
    route: {lat: number, lng: number}[];
    setRoute: (_: {lat: number, lng: number}[]) => void;
    removeWaypoint: (index: number) => void;
    pois: POIType[]
    setPois: (_: POIType[]) => void
}

const MotoRouteEditorDetails = (props: MotoRouteDetailsEditorProps) => {
    const { route, setRoute, removeWaypoint, pois, setPois } = props


    const urlMatch = useMatch('/routes/:id/*')



    return urlMatch !== null ? (
        <Fragment>
            <div className="moto-route-details">
                <div className="details-navigation">
                    <ul className="nav nav-tabs details-nav">
                        <NavLink
                            className="nav-link"
                            to={`${urlMatch.pathnameBase}/details`}
                            title="Route details">
                                <InfoCircleFill />
                        </NavLink>
                        <NavLink
                            className={`nav-link`}
                            to={`${urlMatch.pathnameBase}/route`}
                            title="Route">
                                <MapFill />
                        </NavLink>
                        <NavLink
                            className="nav-link"
                            to={`${urlMatch.pathnameBase}/poi`}
                            title="Points of interest">
                                <GeoAltFill />
                        </NavLink>
                        </ul>
                    </div>


                    <div className="details-content">
                    <Routes>
                        <Route path="/details" element={<MotoRouteEditorDetailsTab />} />
                        <Route path="/route" element={<MotoRouteEditorRouteTab route={ route } setRoute={ setRoute } removeWaypoint={ removeWaypoint } />} />
                        <Route path="/poi" element={<MotoRouteEditorPOITab pois={ pois } setPois={ setPois } />} />
                    </Routes>
                </div> 
                </div>
        </Fragment>
    ) : (<></>)
}

export default MotoRouteEditorDetails;