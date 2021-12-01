/* global google */
import React from "react";

import { useEffect } from "react";

import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const GoogleMapsTest = (props) => {

    const {motoRouteCoords} = props;
    const origin = motoRouteCoords[0];
    const destination = motoRouteCoords[motoRouteCoords.length-1]
    const waypoints = motoRouteCoords.slice(1, motoRouteCoords.length-1).map((coord) => ({location: coord, stopover: false}))

    const [response, setResponse] = React.useState(null)

    const containerStyle = {
        display: "flex",
        width: '100%',
        height: '100%'
    };
      
    
    const center = {
        lat: 52.7478909,
        lng: 18.3737659,
    };

    // const origin = { lat: 40.756795, lng: -73.954298 };
    // const destination = { lat: 41.756795, lng: -78.954298 };
    
    // const origin = { lat: 53.150245, lng: 16.789432 };
    // const destination = { lat: 53.008179, lng: 18.600308 };
    // const waypoints = [
    //     {
    //         location: { lat: 51.785711, lng: 18.083513 },
    //         stopover: false,
    //     },
    //     {
    //         location: { lat: 51.747145, lng: 18.247205 },
    //         stopover: false,
    //     },
    // ]
    

    const directionsCallback = React.useCallback((res) => {
        console.log(res)
    
        if (res !== null) {
          if (res.status === 'OK') {
            setResponse({directions: res})
          } else {
            console.log('response: ', res)
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
    }, [])


    const directionsRendererOptions = React.useMemo(() => {
        return {
            directions: response,
        }
    }, [])

    
    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""} >

                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={6}
                    >
                        
                    {/* <Marker position={{lat: 51.50, lng: 15.47}} />
                    <Marker position={{lat: 49.2, lng: 18.5}} /> */}

                    {destination !== '' && origin !== '' && response === null && (
                        <DirectionsService
                            options={{...directionsServiceOptions, 
                                travelMode: 'DRIVING'}}
                            callback={directionsCallback}
                        />
                    )}

                    {response !== null && (
                        <DirectionsRenderer options={response} />
                    )}
                </GoogleMap>
        </LoadScript>
    )
}

export default GoogleMapsTest;