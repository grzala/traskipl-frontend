import React from "react";

import "./Header.scss"

const Header = () => {
    return (
        <div className="row">
            <div className="header-container container-fluid">
                <div className="nav-wrapper row">
                    <div className="col-md-2"></div>
                    <div className="col-md-3">
                        <img src={ process.env.PUBLIC_URL + '/traski.png' } alt="traski logo" />


                    </div>
                    <div className="col-md-5">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#">Messages</a>
                            </li>
                            <li className="nav-item dropdown ml-md-auto">
                                <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown">Dropdown link</a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" href="#">Action</a> <a className="dropdown-item" href="#">Another action</a> <a className="dropdown-item" href="#">Something else here</a>
                                    <div className="dropdown-divider">
                                    </div> <a className="dropdown-item" href="#">Separated link</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </div>
    )
}

export default Header;