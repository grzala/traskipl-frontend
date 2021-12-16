import React, { Fragment, useEffect, useState } from "react";
import { MotoRouteType, POIType } from "../../../Types/MotoRoutesTypes";
import MotoRouteAccidentsCard from "./MotoRouteAccidentsCard";
import MotoRouteDetailsCard from "./MotoRouteDetailsCard";
import MotoRoutePOIsCard from "./MotoRoutePOIsCard";

import "./MotoRouteDetails.scss"

import { NavLink, Route, Routes, useMatch } from "react-router-dom";

import { MapFill,GeoAltFill, ExclamationSquareFill, Star, StarFill, FlagFill, InfoCircleFill } from 'react-bootstrap-icons';
import StarRatings from 'react-star-ratings';
import { currentUserType, UserType } from "../../../Types/UserTypes";
import { castVote, check_is_favourite, switchFavourite, useGetMotoRouteVoteAndFav } from "../../../Actions/MotoRoutesActions";
import { toast } from "react-toastify";
import ToasterStyles from "../../../ToasterStyles/ToasterStyles"
import HelmetRating from "./HelmetRating";

type MotoRouteProps = {
    route: MotoRouteType;
    selectedPOI: POIType | null;
    onPOIHover: (enter: boolean, poi: POIType) => void;
    onPOISelect: (poi: POIType) => void;
    poiMarkerFilter: boolean;
    poiMarkerFilterChange: (newFilterVal: boolean) => void;
    currentUser: currentUserType;
}

const MotoRouteDetails = (props: MotoRouteProps) => {
    const { route, onPOIHover, onPOISelect, selectedPOI, poiMarkerFilter, poiMarkerFilterChange, currentUser} = props;

    const urlMatch = useMatch('/routes/:id/*')

    const [routeScore, setRouteScore] = useState<number>(route.score);
    
    // User needed for hook when user changes
    const [ yourRouteScore, isRouteFav, setYourRouteScore, setIsRouteFav ] = useGetMotoRouteVoteAndFav(route.id, currentUser) 

    useEffect(() => {
        check_is_favourite(route.id)
        setRouteScore(route.score)
    }, [route])

    const handleFavClick = async (e: any) => {
        e.preventDefault()

        const response = await switchFavourite(route.id)

        const { data } = response
        if (response.status !== 200) {
            if (data?.messages) {
                toast.error(`Action failed: ${data.messages.join(", ")}`, ToasterStyles);
            }
            return
        } 

        setIsRouteFav(data.fav_status)
        toast.success(data.messages.join(", "), ToasterStyles);
    }

    const handleStarRatingClick = async (score: number) => {
        const response = await castVote(route.id, score)

        const { data } = response
        if (response.status !== 200) {
            if (data?.messages) {
                toast.error(`Action failed: ${data.messages.join(", ")}`, ToasterStyles);
            }
            return
        } 

        setRouteScore(data.current_score)
        setYourRouteScore(data.score_vote)
        toast.success(data.messages.join(", "), ToasterStyles);
    }

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
                            className={`nav-link ${poiMarkerFilter ? "" : "disabled"}`}
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
                            <li className="nav-link star-rating-container" 
                                title={yourRouteScore ? `You have voted: ${yourRouteScore}` : "You haven't voted yet"}>
                                    <HelmetRating
                                        score={ routeScore }
                                        votedScore={ yourRouteScore }
                                        handleStarRatingClick={ currentUser ? handleStarRatingClick : undefined }
                                        size={ 1.3 }
                                        spacing={ 0.15 }
                                    />
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                    title="Add to favourites"
                                    href="/add_route_to_favs"
                                    onClick={handleFavClick}
                                    style={{
                                        color: isRouteFav ? '#54bac1' : "white"
                                    }}>
                                    {isRouteFav ? (
                                        <StarFill />
                                    ) : (
                                        <Star />
                                    )}
                                        
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
                        <Route path="/details" element={<MotoRouteDetailsCard route={route} poiMarkerFilter={poiMarkerFilter} poiMarkerFilterChange={poiMarkerFilterChange} />} />
                        <Route path="/poi" element={
                            <MotoRoutePOIsCard route={route} onPOIHover={onPOIHover} onPOISelect={onPOISelect} selectedPOI={selectedPOI} />
                        } />
                        <Route path="/accidents" element={<MotoRouteAccidentsCard route={route} />} />
                    </Routes>
                </div> 
            </div>
        </Fragment>
    ) :
    <></>
}

export default MotoRouteDetails;