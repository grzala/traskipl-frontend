import React, { Fragment } from "react";
import { GeoAltFill, InfoCircleFill, MapFill } from "react-bootstrap-icons";
import { NavLink, Route, Routes, useMatch } from "react-router-dom";
import MotoRouteEditorDetails from "./MotoRouteEditorDetails";

const MotoRouteDetailsEditor = () => {


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
                        <Route path="/details" element={<MotoRouteEditorDetails />} />
                        <Route path="/route" element={
                            <h1>pois</h1>
                        } />
                        <Route path="/poi" element={<h1>pois</h1>} />
                    </Routes>
                </div> 
                </div>
        </Fragment>
    ) : (<></>)
}

export default MotoRouteDetailsEditor;