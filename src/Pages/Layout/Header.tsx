import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserBox from "../../Auth/UserBox";
import { userContext } from "../../Contexts/UserContext";

import "./Header.scss"

const Header = () => {


    const user = useContext(userContext);


    return (
        <div className="row">
            <div className="header-container container-fluid">
                <div className="nav-wrapper row">
                    <div className="col-md-2"></div>
                    <div className="col-md-2 d-flex align-items-end">
                        <div className="logo-wrapper">
                            <Link to="/">
                                <img src={ process.env.PUBLIC_URL + '/traski.png' } alt="traski logo" />
                            </Link>
                        </div>

                    </div>

                    <div className="col-md-3 d-flex align-items-end">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/moto_route_list/top/1">Top rated</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/search">Search</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/accidentsmap">Accidents map</NavLink>
                            </li>
                            { user.user && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/routes/editor/new/details">Editor</NavLink>
                                </li>
                            )}
                            {/* <li className="nav-item dropdown ml-md-auto">
                                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown">Dropdown link</a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" href="/#">Action</a> <a className="dropdown-item" href="/#">Another action</a> <a className="dropdown-item" href="/#">Something else here</a>
                                    <div className="dropdown-divider">
                                    </div> <a className="dropdown-item" href="/#">Separated link</a>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                    <div className="userbox-col col-md-3 d-flex align-items-end justify-content-end">
                        <UserBox />
                    </div>

                    <div className="col-md-2"></div>
                </div>
            </div>
        </div>
    )
}

export default Header;