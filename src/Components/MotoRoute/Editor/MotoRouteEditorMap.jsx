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

const MotoRouteEditorMap = (props) => {
    const { handleMapClick, route, pois, selectedPOI, hoveredPOI, onPOISelect, setRouteLength} = props

    const [directionsResponse, setDirectionsResponse] = useState(null)

    // Re-get directions when route changes
    useEffect(() =>{
        setDirectionsResponse(null)
    }, [route])

    const directionsCallback = useCallback((res) => {
        if (res !== null) {
          if (res.status === 'OK') {
            setDirectionsResponse({directions: res})

            if (res.routes?.length > 0) {
                var totalDistance = 0;
                var legs = res.routes[0].legs;
                for(var i=0; i<legs.length; ++i) {
                    totalDistance += legs[i].distance.value;
                }
                setRouteLength(totalDistance / 1000.0)
            }
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


    const isFocusedMarker = useCallback((poi) => {
        if (selectedPOI?.id === poi?.id)
            return true;
        if (hoveredPOI?.id === poi?.id)
            return true;
        return false;
    }, [hoveredPOI, selectedPOI])

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""} >
                <GoogleMap
                    mapContainerStyle={ mapContainerStyle }
                    center={ DEFAULT_MAP_POSITION }
                    zoom={ DEFAULT_MAP_ZOOM }
                    onClick={ handleMapClick }
                    >

                    {/* ================ ROUTE ===============*/}
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

                    {/* ================ POIS ===============*/}

                    {pois.map((poi, index) => (
                            <Marker 
                                key={`marker_${poi.id}`} 
                                position={ poi.coordinates } 
                                icon={ isFocusedMarker(poi) ? mapIconEnlargedDropsUrls[poi.variant] : mapIconDropsUrls[poi.variant] }
                                clickable={ true }
                                onClick={() => onPOISelect(poi)}
                                zIndex={ isFocusedMarker(poi) ? 100 : 1 } 
                                />
                    ))}
                        
                </GoogleMap>
        </LoadScript>
    )
}

export default MotoRouteEditorMap;