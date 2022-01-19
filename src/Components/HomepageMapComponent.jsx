import React, { Fragment, useEffect, useCallback, useMemo } from "react";

import { DirectionsService, DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';


const mapWrapperStyle = {
    height: "40em",
    width: "100%"
}

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
const defaultZoom = 6.5;


const HomepageMapComponent = (props) => {    
    const { route, pointOfSearch, handleMapClick } = props;

    // const { isLoaded } = useJsApiLoader({ id: "google-map-script", googleMapsApiKey: 'google-api-key', });
    // const [scriptLoaded, setScriptLoaded] = useState(false)
    const origin = route?.coordinates[0];
    const destination = route?.coordinates[route.coordinates.length-1]
    const waypoints = route?.coordinates.slice(1, route?.coordinates.length-1).map((coord) => ({location: coord, stopover: false}))

    const [directionsResponse, setDirectionsResponse] = React.useState(null)

    useEffect(() => {
        // Setting directions response to null when route changes will force api to re-generate directions
        if (route !== null) setDirectionsResponse(null)
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
        var dirInfo = {
            destination: destination,
            origin: origin,
        }

        if (waypoints !== undefined && waypoints.length > 0) {
            dirInfo = {
                ...dirInfo,
                waypoints: waypoints,
            }
        }

        return dirInfo;
    }, [origin, destination, waypoints])
    
    return (
        <div style={mapWrapperStyle}>
            <GoogleMap
                mapContainerStyle={ mapContainerStyle }
                center={ DEFAULT_MAP_POSITION }
                zoom={ defaultZoom }
                onClick={ handleMapClick }
                >
                
                {pointOfSearch !== null && (
                    <Marker 
                        position={ pointOfSearch } 
                        zIndex={ 100 } 
                    />
                )}

                {/* This code gets directions from API */}
        
                {route !== null && (
                    <Fragment>
                        {/* REACT_APP_SKIP_MAP_RENDERING allows to save on requests when not working on directions feature */}
                        {process.env.REACT_APP_SKIP_MAP_RENDERING !== "TRUE" && destination !== '' && origin !== '' && directionsResponse === null && (
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
        </div>
    )
}

export default HomepageMapComponent