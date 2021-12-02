import React, { Fragment, useState } from "react";
import { MotoRouteType } from "../../Types/MotoRoutesTypes";
import MotoRouteAccidentsCard from "./MotoRouteAccidentsCard";
import MotoRouteDetailsCard from "./MotoRouteDetailsCard";
import MotoRoutePOIsCard from "./MotoRoutePOIsCard";

import "./MotoRouteDetails.scss"

import { Link, NavLink, Route, Routes, useMatch } from "react-router-dom";

import { MapFill,GeoAltFill, ExclamationSquareFill, Star, StarFill, FlagFill } from 'react-bootstrap-icons';
import StarRatings from 'react-star-ratings';


const helmetSvgViewbox = "0 0 512 512"
const hemletSvgPath =  `M294.396 52.127c-17.944.066-35.777 1.834-52.886 4.746-86.727 14.76-135.612 53.467-161.99 
                        107.824 31.215-2.434 62.002-5.024 91.966-4.838 24.114.15 47.696 2.097 70.54 7.37 15.15 
                        3.5 24.652 16.647 27.607 31.735 2.954 15.088.858 32.92-5.055 51.553l-.287.904-.468.826c-7.762 
                        13.64-24.263 24.498-45.295 35.994-21.032 11.497-46.695 22.693-72.27 32.428-25.574 9.735-51.012 
                        17.98-71.575 23.437-7.254 1.925-13.85 3.48-19.735 4.657 2.275 31.13 6.562 63.38 12.008 95.98 
                        140.118-38.25 273.5-79.888 403.51-123.254 25.935-44.457 29.927-86.448 
                        16.967-126.734-22.393-69.605-60.9-107.048-105.215-126.168-27.696-11.95-57.913-16.57-87.82-16.46zM130.184 
                        179.205c-9.06.51-18.265 1.156-27.532 1.836L59.31 329.386c3.384-.79 6.936-1.663 10.754-2.676 4.004-1.063 
                        8.27-2.27 12.66-3.554 10.022-31.07 43.3-131.415 47.46-143.95zm-46.7 3.262c-10.868.826-21.824 1.654-32.908 
                        2.37-.32.445-.714.947-1.318 2.267-1.58 3.45-3.375 9.418-4.912 16.724-3.075 14.612-5.37 34.727-6.705 
                        54.877-1.333 20.15-1.73 40.438-1.193 55.582.268 7.572.79 13.905 1.442 17.96.048.306.078.312.13.59.46-.01 
                        1.033-.044 1.546-.064l43.918-150.306zM224 183c-15.596 0-28.66 12.582-28.66 28.152s13.064 28.155 28.66 
                        28.155 28.66-12.584 28.66-28.155c0-15.57-13.064-28.152-28.66-28.152zm0 18c6.12 0 10.66 4.567 10.66 10.152 0 
                        5.586-4.54 10.155-10.66 10.155s-10.66-4.57-10.66-10.155c0-5.585 4.54-10.152 10.66-10.152zm230.19 144.865C330.383 
                        386.852 203.285 426.23 70.054 462.56c.413 2.317.81 4.63 1.232 6.948 147.607-26.65 255.974-68.965 371.36-109.164 
                        4.118-4.857 7.947-9.68 11.546-14.48z`

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

                        <ul className="nav justify-content-end options-bar">
                            <li className="nav-link star-rating-container" title="Route rating">
                                <StarRatings
                                    rating={3.2}
                                    starRatedColor='rgb(218, 232, 24)'
                                    starHoverColor='rgb(218, 232, 24)'
                                    svgIconViewBox={helmetSvgViewbox}
                                    svgIconPath={hemletSvgPath}
                                    changeRating={() => {}}
                                    numberOfStars={5}
                                    starDimension="25px"
                                    starSpacing="2px"
                                    name='route-rating'
                                />
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                    title="Add to favourites"
                                    href="/#">
                                    <Star />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                    title="Report"
                                    href="/#">
                                    <FlagFill />
                                </a>
                            </li>
                        </ul>
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