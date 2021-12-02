import React, { Fragment, useState } from "react";
import { MotoRouteType } from "../../Types/MotoRoutesTypes";
import MotoRouteAccidentsCard from "./MotoRouteAccidentsCard";
import MotoRouteDetailsCard from "./MotoRouteDetailsCard";
import MotoRoutePOIsCard from "./MotoRoutePOIsCard";

import "./MotoRouteDetails.scss"
import { Link, NavLink, Route, Routes, useMatch } from "react-router-dom";

import { MapFill,GeoAltFill, ExclamationSquareFill } from 'react-bootstrap-icons';

type MotoRouteProps = {
    route: MotoRouteType
}

const MotoRouteDetails = (props: MotoRouteProps) => {
    const { route } = props;

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
                                <MapFill />
                        </NavLink>
                        <NavLink
                            className="nav-link"
                            to={`${urlMatch.pathnameBase}/poi`}
                            title="Points of interest">
                                <GeoAltFill />
                        </NavLink>
                        <NavLink
                            className="nav-link"
                            to={`${urlMatch.pathnameBase}/accidents`}
                            title="Accidents">
                                <ExclamationSquareFill />
                        </NavLink>

                    </ul>
                </div>

                <div className="details-content">
                    <Routes>
                        <Route path="/details" element={<MotoRouteDetailsCard route={route} />} />
                        <Route path="/poi" element={<MotoRoutePOIsCard route={route} />} />
                        <Route path="/accidents" element={<MotoRouteAccidentsCard route={route} />} />
                    </Routes>
                </div> 
            </div>
        </Fragment>
    ) :
    <></>
}

export default MotoRouteDetails;