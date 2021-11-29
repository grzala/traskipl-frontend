import React, { Fragment } from "react";
import { MotoRouteType } from "../Actions/MotoRoutesActions";

import "./MotoRoutesList.scss"

type MotoRoutesListProps = {
    motoRoutesList: MotoRouteType[];
}

const MotoRoutesList = (props: MotoRoutesListProps) => {
    const { motoRoutesList } = props

    return(
        <Fragment>
            <div className="moto-routes-list list-group">
                <a href="#" className="list-group-item list-group-item-action active">
                    Recently added routes
                </a>

                { motoRoutesList.map((route) => 
                    <a href="#" className="moto-routes-list-item list-group-item list-group-item-action">
                        <div className="row">
                            <div className="col-sm-4">
                                <img src={ process.env.PUBLIC_URL + '/samples/map1.png' } />
                            </div>

                            <div className="col-sm-8">
                                <p>{ route.title }</p>
                                <p>{ route.description }</p>
                            </div>
                        </div>
                    </a>
                )}
            </div>
        </Fragment>
    )
}

export default MotoRoutesList;