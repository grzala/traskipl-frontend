import React from "react";

import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const MotoRouteMap = (props) => {

    const defaultZoom = 6;
    
    const {motoRouteCoords} = props;
    const origin = motoRouteCoords[0];
    const destination = motoRouteCoords[motoRouteCoords.length-1]
    const waypoints = motoRouteCoords.slice(1, motoRouteCoords.length-1).map((coord) => ({location: coord, stopover: false}))

    const [directionsResponse, setDirectionsResponse] = React.useState(null)

    const mapContainerStyle = {
        display: "flex",
        width: '100%',
        height: '100%'
    };

    const directionsCallback = React.useCallback((res) => {
        console.log(res)
    
        if (res !== null) {
          if (res.status === 'OK') {
            setDirectionsResponse({directions: res})
          } else {
            console.log('Directions response error: ', res)
          }
        }
      }, [])

    const directionsServiceOptions = React.useMemo(() => {
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
    }, [origin, destination, waypoints])

    
    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""} >

                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={origin}
                    zoom={defaultZoom}
                    >
                        
                    {/* <Marker position={{lat: 51.50, lng: 15.47}} />
                    <Marker position={{lat: 49.2, lng: 18.5}} /> */}

                    {/* This code gets directions from API
                        This is stupid to do this in rendering, but this is how the library wanted it done */}
                    {destination !== '' && origin !== '' && directionsResponse === null && (
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
                </GoogleMap>
        </LoadScript>
    )
}

export default MotoRouteMap;