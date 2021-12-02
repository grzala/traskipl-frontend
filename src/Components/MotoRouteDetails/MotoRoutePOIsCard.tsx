import React, { Fragment } from "react";
import { MotoRouteType } from "../../Types/MotoRoutesTypes";

type MotoRoutePOIsCardProps = {
    route: MotoRouteType
}

const MotoRoutePOIsCard = (props: MotoRoutePOIsCardProps) => {
    const { route } = props;


    return (
        <Fragment>

            <div className="list-group">
                <a href="#?poi" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2">
                                <img src={ process.env.PUBLIC_URL + '/maps_icons/circles/food.png'} />
                            </div>
                            <div className="col-md-10">

                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">List group item bandit</h5>
                                </div>
                                <p className="mb-1">Donec id es2lit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

        </Fragment>
    )
}

export default MotoRoutePOIsCard;