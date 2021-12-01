import React, { Fragment } from "react";
import { MotoRouteType } from "../../Types/MotoRoutesTypes";

type MotoRouteDetailsCardProps = {
    route: MotoRouteType
}

const MotoRouteDetailsCard = (props: MotoRouteDetailsCardProps) => {
    const { route } = props;


    return (
        <Fragment>

            <h2>{route.title}</h2>
            <p>{route.description}</p>

        </Fragment>
    )
}

export default MotoRouteDetailsCard;