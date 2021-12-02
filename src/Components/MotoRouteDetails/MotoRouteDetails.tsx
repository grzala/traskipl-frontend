import React, { Fragment, useState } from "react";
import { MotoRouteType } from "../../Types/MotoRoutesTypes";
import MotoRouteAccidentsCard from "./MotoRouteAccidentsCard";
import MotoRouteDetailsCard from "./MotoRouteDetailsCard";
import MotoRoutePOIsCard from "./MotoRoutePOIsCard";

import "./MotoRouteDetails.scss"
import { Link, NavLink, Route, Routes, useMatch } from "react-router-dom";

type MotoRouteProps = {
    route: MotoRouteType
}


enum Card {
    DETAILS,
    POIS,
    ACCIDENTS
}

const MotoRouteDetails = (props: MotoRouteProps) => {
    const { route } = props;

    const [currentCard, setCurrentCard] = useState<Card>(Card.DETAILS);

    const urlMatch = useMatch('/routes/:id/*')
    console.log(urlMatch)

    const renderCard = () => {
        switch (currentCard) {
            case Card.DETAILS:
                return <MotoRouteDetailsCard route={route} />
            case Card.POIS:
                return <MotoRoutePOIsCard route={route} />
            case Card.ACCIDENTS:
                return <MotoRouteAccidentsCard route={route} />
            
            default:
                console.log("BEHAVIOR NOT IMPLEMENTED (MotoRouteDetails Card");
        }
    }

    const handleNavlinkClick = (e: any, newCard: Card) => {
        e.preventDefault();
        setCurrentCard(newCard);
    }

    return urlMatch !== null ? (
        <Fragment>
            {/* <ul className="nav nav-tabs details-nav">
                <li className="nav-item">
                    <a 
                        className={ "nav-link" + (currentCard === Card.DETAILS ? " active" : "") } 
                        href="#?details" 
                        onClick={ (e) => handleNavlinkClick(e, Card.DETAILS) }
                        >
                            Details
                    </a>
                </li>
                <li className="nav-item">
                    <a 
                        className={ "nav-link" + (currentCard === Card.POIS ? " active" : "") } 
                        href="#?details" 
                        onClick={ (e) => handleNavlinkClick(e, Card.POIS) }
                        >
                            POI
                    </a>
                </li>
                <li className="nav-item">
                    <a 
                        className={ "nav-link" + (currentCard === Card.ACCIDENTS ? " active" : "") } 
                        href="#?details" 
                        onClick={ (e) => handleNavlinkClick(e, Card.ACCIDENTS) }
                        >
                            Accidents
                    </a>
                </li>
            </ul>
            
            <div className="details-content">
                { renderCard() }
            </div> */}


            <ul className="nav nav-tabs details-nav">
                <NavLink
                    to={`${urlMatch.pathnameBase}/a`}>
                        Details
                </NavLink>
                <NavLink
                    to={`${urlMatch.pathnameBase}/b`}>
                        POI
                </NavLink>

            </ul>
            <Routes>
                <Route path="/a" element={<MotoRouteDetailsCard route={route} />} />
                <Route path="/b" element={<MotoRoutePOIsCard route={route} />} />
            </Routes>
        </Fragment>
    ) :
    <></>
}

export default MotoRouteDetails;