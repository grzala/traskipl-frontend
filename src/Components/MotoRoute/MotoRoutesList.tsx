import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { MotoRouteType } from "../../Types/MotoRoutesTypes";

import "./MotoRoutesList.scss"

type MotoRoutesListProps = {
    motoRoutesList: MotoRouteType[];
}

const MotoRoutesList = (props: MotoRoutesListProps) => {
    const { motoRoutesList } = props

    return(
        <Fragment>
            <div className="moto-routes-list list-group">
                <a href="/#" className="list-group-item list-group-item-action active">
                    Other routes in the area
                </a>

                <div className="moto-routes-list-main">
                    { motoRoutesList.map((route) => 
                        <Link key={`moto-list-item-${route.id}`} to={`/routes/${route.id}/details`} className="moto-routes-list-item list-group-item list-group-item-action">
                            <div className="row">
                                <div className="map-thumbnail-col">
                                    <img src={ process.env.PUBLIC_URL + '/samples/map1.png' } alt="map of the route" />
                                </div>

                                <div className="col-sm-7">
                                    <p>{ route.name }</p>
                                    <p className="moto-routes-list-item-description">{ route.description }</p>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default MotoRoutesList;