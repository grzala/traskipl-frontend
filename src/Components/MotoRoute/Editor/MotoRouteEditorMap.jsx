import React, {  } from "react";

import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import { mapIconDropsUrls, mapIconEnlargedDropsUrls } from "../../MapConstants";

const mapContainerStyle = {
    display: "flex",
    width: '100%',
    height: '100%'
};

const defaultZoom = 6;

const mapPosition = {
    lat: 52.0,
    lng: 19.0,
}

const MotoRouteCreatorMap = () => {



    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""} >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={mapPosition}
                    zoom={defaultZoom}
                    >
                        
                </GoogleMap>
        </LoadScript>
    )
}

export default MotoRouteCreatorMap;