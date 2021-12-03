import React, { useCallback, useMemo, useEffect } from "react";

import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import { mapIconDropsUrls, mapIconEnlargedDropsUrls } from "../MapConstants";



const mapContainerStyle = {
    display: "flex",
    width: '100%',
    height: '100%'
};

const MotoRouteMap = (props) => {

    const defaultZoom = 10;
    
    const { motoRouteCoords, motoRoutePOIs, hoveredPOI, selectedPOI, onPOISelect, poiMarkerFilter } = props;
    const origin = motoRouteCoords[0];
    var mapPosition = origin;
    const destination = motoRouteCoords[motoRouteCoords.length-1]
    const waypoints = motoRouteCoords.slice(1, motoRouteCoords.length-1).map((coord) => ({location: coord, stopover: false}))

    const [directionsResponse, setDirectionsResponse] = React.useState(null)

    const directionsCallback = useCallback((res) => {
        console.log(res)
    
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

        if (waypoints.length > 0) {
            dirInfo = {
                ...dirInfo,
                waypoints: waypoints,
            }
        }

        return dirInfo;
    }, [origin, destination, waypoints])


    useEffect(() => {
        // mapPosition = {
        // }
    }, [selectedPOI])



    const isFocusedMarker = useCallback((poi_id) => {
        if (selectedPOI?._id === poi_id)
            return true;
        if (hoveredPOI !== null && hoveredPOI === poi_id)
            return true;
        return false;
    }, [hoveredPOI, selectedPOI])
    
    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""} >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={mapPosition}
                    zoom={defaultZoom}
                    >

                    {poiMarkerFilter && motoRoutePOIs && (
                        motoRoutePOIs.map((poi, index) => {
                            return (<Marker 
                                        key={`marker_${index}`} 
                                        position={ poi.coordinates } 
                                        icon={ isFocusedMarker(poi._id) ? mapIconEnlargedDropsUrls[poi.variant] : mapIconDropsUrls[poi.variant] }
                                        clickable={ true }
                                        onClick={() => onPOISelect(poi)}
                                        zIndex={ isFocusedMarker(poi._id) ? 100 : 1 } />)
                        })
                    )}

                        {/* This code gets directions from API
                            This is stupid to do this in rendering, but this is how the library wanted it done */}
                        
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
                </GoogleMap>
        </LoadScript>
    )
}

export default MotoRouteMap;