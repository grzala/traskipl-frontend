import React, { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { getMotoRoute, MotoRouteType } from "../Actions/MotoRoutesActions";

import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
  };
  

  const center = {
    lat: 51.7478909,
    lng: 16.3737659,
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

            yayaya { id }
            {route?.title}

            
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""} >

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={2}
                    >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
                </GoogleMap>
            </LoadScript>

        </Fragment>
      ) : <></>
}

export default MotoRoutePage;


