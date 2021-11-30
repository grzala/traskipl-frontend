import React from "react";

import { useEffect } from "react";

import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const GoogleMapsTest = () => {


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
    
    const origin = { lat: 53.150245, lng: 16.789432 };
    const destination = { lat: 53.008179, lng: 18.600308 };
    

    const directionsCallback = React.useCallback((res) => {
        console.log(res)
    
        if (res !== null) {
          if (res.status === 'OK') {
            setResponse(res)
          } else {
            console.log('response: ', res)
          }
        }
      }, [])

    const directionsServiceOptions = React.useMemo(() => {
        return {
            destination: destination,
            origin: origin,
        }
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

                    {destination !== '' && origin !== '' && response == null && (
                        <DirectionsService
                            options={{...directionsServiceOptions, 
                                travelMode: 'DRIVING'}}
                            callback={directionsCallback}
                        />
                    )}

                    {response !== null && (
                      <DirectionsRenderer options={directionsRendererOptions} />
                    )}
                </GoogleMap>
        </LoadScript>
    )
}

export default GoogleMapsTest;