import React, { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getMotoRoute, MotoRouteType } from "../Actions/MotoRoutesActions";

import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    display: "flex",
    width: '100%',
    height: '100%'
};
  

const center = {
    lat: 51.7478909,
    lng: 20.3737659,
};

const MotoRoutePage = () => {
    const { id } = useParams()

    const [route, setRoute] = useState<MotoRouteType>();

    useEffect(() => {
        setRoute(getMotoRoute(id))
    }, [id])
    


    
    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return true ? (

        <Fragment>
            <div className="row">
                <div className="col-md-8">
                    <div style={{
                            //width: "60em",
                            height: "40em"
                        }}>
                    
                        <LoadScript
                            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""} >

                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={6}
                                    >
                                        
                                    <Marker position={{lng: 10, lat: 10}} />
                                </GoogleMap>
                        </LoadScript>
                    
                    </div>
                </div>
                <div className="col-md-4">

                    <h2>{route?.title}</h2>
                    <p>{route?.description}</p>
                </div>
            </div>

            <div className="row mt-20">&nbsp;</div>

            <div className="row mt-100">
                <div className="col-md-6">
                    <div className="list-group">
                        <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start active">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">List group item heading</h5>
                                <small>3 days ago</small>
                            </div>
                            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                            <small>Donec id elit non mi porta.</small>
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

        </Fragment>
      ) : <></>
}

export default MotoRoutePage;


