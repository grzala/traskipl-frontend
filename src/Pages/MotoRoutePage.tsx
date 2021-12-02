import React, { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";


import { MotoRouteType} from "../Types/MotoRoutesTypes"
import { getMotoRoute } from "../Actions/MotoRoutesActions";


import MotoRouteMap from "../Components/MotoRoute/MotoRouteMap";

import "./MotoRoutePage.scss"
import MotoRouteDetails from "../Components/MotoRoute/MotoRouteDetails/MotoRouteDetails";
import MotoRouteComments from "../Components/MotoRoute/MotoRouteComments";

  
const MotoRoutePage = () => {
    const { id } = useParams()

    const [route, setRoute] = useState<MotoRouteType>();

    useEffect(() => {
        setRoute(getMotoRoute(id))
    }, [id])



    return (
        <Fragment>
            <div className="row display-flex map-details-container">
                <div className="col-md-8 moto-route-map-container">
                    
                    {route && (
                        <MotoRouteMap motoRouteCoords={route.coordinates} motoRoutePOIs={route.points_of_interest} />   
                    )}
                    
                </div>
                <div className="col-md-4 moto-route-details-container">
                    { route && (
                        <MotoRouteDetails route={route} />
                    )}
                </div>
            </div>


            <div className="row">
                <div className="moto-route-page-comments-wrapper mt-3 mb-3">
                    <div className="col-md-8 comments">
                        <MotoRouteComments />
                    </div>
                    <div className="col-md-4">

                    </div>
                </div>
            </div>
        </Fragment>
      )
}

export default MotoRoutePage;


