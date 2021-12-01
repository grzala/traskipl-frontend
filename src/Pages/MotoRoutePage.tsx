import React, { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getMotoRoute, MotoRouteType } from "../Actions/MotoRoutesActions";


import ExampleDirections from "./example-directions";

import GoogleMapsTest from "./GoogleMapsTest";


export const mapContainerStyle = {
    height: '400px',
    width: '100%',
  }
  
  export const shapeExampleStyles = {
    container: mapContainerStyle,
  }
  
const MotoRoutePage = () => {
    const { id } = useParams()

    const [route, setRoute] = useState<MotoRouteType>();

    useEffect(() => {
        setRoute(getMotoRoute(id))
    }, [id])


    

    return true ? (

        <Fragment>
            <div className="row">
                <div className="col-md-8">
                    <div style={{
                            //width: "60em",
                            height: "40em"
                        }}>
                    
                        {route && (
                            <GoogleMapsTest motoRouteCoords={route?.coordinates} />   
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
                                Komentarze
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
      ) : <></>
}

export default MotoRoutePage;


