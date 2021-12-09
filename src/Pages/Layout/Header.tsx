import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import UserBox from "../../Auth/UserBox";
import { userContext } from "../../Contexts/UserContext";

import "./Header.scss"

const Header = () => {
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

                    <userContext.Consumer>
                        {({user}) => (
                            <Fragment>
                                <div className="col-md-3 d-flex align-items-end">
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="/#">Home</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/#">Profile</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link disabled" href="/#">Messages</a>
                                        </li>
                                        <li className="nav-item dropdown ml-md-auto">
                                            <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown">Dropdown link</a>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                                <a className="dropdown-item" href="/#">Action</a> <a className="dropdown-item" href="/#">Another action</a> <a className="dropdown-item" href="/#">Something else here</a>
                                                <div className="dropdown-divider">
                                                </div> <a className="dropdown-item" href="/#">Separated link</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="userbox-col col-md-3 d-flex align-items-end justify-content-end">
                                    <UserBox />
                                </div>
                            </Fragment>
                        )}
                    </userContext.Consumer>

                    <div className="col-md-2"></div>
                </div>
            </div>
        </div>
    )
}

export default Header;