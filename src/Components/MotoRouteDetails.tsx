import React, { Fragment } from "react";
import { MotoRouteType } from "../Types/MotoRoutesTypes";

type MotoRouteProps = {
    route: MotoRouteType
}

const MotoRouteDetails = (props: MotoRouteProps) => {
    const { route } = props;

    return (
        <Fragment>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" href="#">Active</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
            
            <h2>{route.title}</h2>
            <p>{route.description}</p>
        </Fragment>
    )
}

export default MotoRouteDetails;