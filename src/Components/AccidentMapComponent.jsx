import React, { } from "react";

import { GoogleMap, Marker } from '@react-google-maps/api';
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
    
    return (
        <div style={mapWrapperStyle}>
            <GoogleMap
                mapContainerStyle={ mapContainerStyle }
                center={ DEFAULT_MAP_POSITION }
                zoom={ defaultZoom }
                >
                
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

            </GoogleMap>
        </div>
    )
}

export default AccidentMapComponent