import React, { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";


import { MotoRouteType, POIType, POIVariant} from "../Types/MotoRoutesTypes"
import { getMotoRoute } from "../Actions/MotoRoutesActions";


import MotoRouteMap from "../Components/MotoRouteMap";

import "./MotoRoutePage.scss"

  
const MotoRoutePage = () => {
    const { id } = useParams()

    const [route, setRoute] = useState<MotoRouteType>();

    useEffect(() => {
        setRoute(getMotoRoute(id))
    }, [id])



    return (
        <Fragment>
            <div className="row">
                <div className="col-md-8">
                    <div className="moto-route-map-container">
                    
                        {route && (
                            <MotoRouteMap motoRouteCoords={route?.coordinates} motoRoutePOIs={route?.points_of_interest} />   
                        )}
                    
                    </div>
                </div>
                <div className="col-md-4">

                    <h2>{route?.title}</h2>
                    <p>{route?.description}</p>
                </div>
            </div>


            <div className="row">
                <div className="moto-route-page-comments-wrapper mt-3 mb-3">
                    <div className="col-md-6 comments">
                        <div className="list-group">
                            <a 
                                href="/#" 
                                className="list-group-item list-group-item-action flex-column align-items-start active">
                                Comments
                            </a>
                            <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">List group item heading</h5>
                                    <small className="text-muted">3 d1ays ago</small>
                                </div>
                                <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                <small className="text-muted">Donec id elit non mi porta.</small>
                            </a>
                            <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">List group item heading</h5>
                                    <small className="text-muted">3 days ago</small>
                                </div>
                                <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                <small className="text-muted">Donec id elit non mi porta.</small>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-6">

                    </div>
                </div>
            </div>
        </Fragment>
      )
}

export default MotoRoutePage;


