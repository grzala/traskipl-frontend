/* global google */
import React, { Fragment, useState } from "react";

import { GoogleMap, LoadScript, mapLayer, Marker } from '@react-google-maps/api';
import { mapIconInjuryUrls } from "./MapConstants";


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


const AccidentMapComponent = (props) => {    
    const { accidents } = props;

    // const { isLoaded } = useJsApiLoader({ id: "google-map-script", googleMapsApiKey: 'google-api-key', });
    const [scriptLoaded, setScriptLoaded] = useState(false)

    
    return (
        <div style={mapWrapperStyle}>
            
            <LoadScript
                // libraries={["visualization"]} 
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""} 
                onLoad={() => setScriptLoaded(true)}
                >
                    <GoogleMap
                        mapContainerStyle={ mapContainerStyle }
                        center={ DEFAULT_MAP_POSITION }
                        zoom={ defaultZoom }
                        >
                        
                        {scriptLoaded && (
                            <Fragment>
                                {/* <mapLayer
                                    // required
                                    data={accidents.map((accident) => {
                                        return new google.maps.LatLng(accident.latitude, accident.longitude)
                                    })}
                                /> */}

                                {accidents.map((accident, index) => {
                                    return (<Marker 
                                                key={`marker_accident_${accident.id}`} 
                                                position={ accident.coordinates } 
                                                icon={ mapIconInjuryUrls[accident.injury] }
                                                clickable={ true }
                                                onClick={() => {
                                                    window.open(`http://sewik.pl/accident/${accident.original_id}`, '_blank'); 
                                                }}
                                            />)
                                })}
                            </Fragment>
                        )}

                    </GoogleMap>
            </LoadScript>

        </div>
    )
}

export default AccidentMapComponent