import React, { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import { mapIconDropsUrls, mapIconEnlargedDropsUrls } from "../../MapConstants";

const mapContainerStyle = {
    display: "flex",
    width: '100%',
    height: '100%'
};

// Default map vals
const DEFAULT_MAP_POSITION = {
    lat: 52.0,
    lng: 19.0,
}

const DEFAULT_MAP_ZOOM = 7

const MotoRouteCreatorMap = (props) => {
    const { handleMapClick, route } = props

    const [directionsResponse, setDirectionsResponse] = useState(null)

    // Re-get directions when route changes
    useEffect(() =>{
        setDirectionsResponse(null)
    }, [route])

    const directionsCallback = useCallback((res) => {
        if (res !== null) {
          if (res.status === 'OK') {
            setDirectionsResponse({directions: res})
          } else {
            console.log('Directions response error: ', res)
          }
        }
      }, [])

    const directionsServiceOptions = useMemo(() => {
        if (route.length < 2)
            return null //Route cannot be created

        const origin = route[0];
        const destination = route[route.length-1]
        const waypoints = route.slice(1, route.length-1).map((coord) => ({location: coord, stopover: false}))

        var dirInfo = {
            destination: destination,
            origin: origin,
        }

        if (waypoints.length > 0) {
            dirInfo = {
                ...dirInfo,
                waypoints: waypoints,
            }
        }

        return dirInfo;
    }, [route])

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""} >
                <GoogleMap
                    mapContainerStyle={ mapContainerStyle }
                    center={ DEFAULT_MAP_POSITION }
                    zoom={ DEFAULT_MAP_ZOOM }
                    onClick={ handleMapClick }
                    >

                    { route.length === 1 && (
                        <Marker 
                            position={ route[0] } 
                            />
                    )}

                    { route.length > 1 && (
                        <Fragment>
                            {/* This code gets directions from API
                                This is stupid to do this in rendering, but this is how the library wanted it done */}
                            
                            {/* REACT_APP_SKIP_MAP_RENDERING allows to save on requests when not working on directions feature */}
                            {process.env.REACT_APP_SKIP_MAP_RENDERING !== "TRUE" && directionsResponse === null && (
                                <DirectionsService
                                    options={{...directionsServiceOptions, 
                                        travelMode: 'DRIVING'}}
                                    callback={directionsCallback}
                                />
                            )}

                            {/* This code renders the directions after they were received from API */}
                            {directionsResponse !== null && (
                                <DirectionsRenderer options={directionsResponse} />
                            )}
                        </Fragment>
                    )}
                        
                </GoogleMap>
        </LoadScript>
    )
}

export default MotoRouteCreatorMap;