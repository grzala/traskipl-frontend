import React, { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router";
import { getMotoRoute, MotoRouteType } from "../Actions/MotoRoutesActions";
import Header from "./Layout/Header";

const MotoRoutePage = () => {
    const { id } = useParams()

    const [route, setRoute] = useState<MotoRouteType>();

    useEffect(() => {
        setRoute(getMotoRoute(id))
    })
    
    return (
        <Fragment>
            <Header />

                yayaya { id }
                {route?.title}


        </Fragment>
    )
}

export default MotoRoutePage;