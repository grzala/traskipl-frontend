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
    
    const { route, hoveredPOI, selectedPOI, onPOISelect, poiMarkerFilter } = props;
    const origin = route.coordinates[0];
    var mapPosition = origin;
    const destination = route.coordinates[route.coordinates.length-1]
    const waypoints = route.coordinates.slice(1, route.coordinates.length-1).map((coord) => ({location: coord, stopover: false}))

    const [directionsResponse, setDirectionsResponse] = React.useState(null)

    useEffect(() => {
        // Setting directions response to null when route changes will force api to re-generate directions
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
                    center={ mapPosition }
                    zoom={ defaultZoom }
                    >

                    {poiMarkerFilter && route.point_of_interests && (
                        route.point_of_interests.map((poi, index) => {
                            return (<Marker 
                                        key={`marker_${poi.id}`} 
                                        position={ poi.coordinates } 
                                        icon={ isFocusedMarker(poi) ? mapIconEnlargedDropsUrls[poi.variant] : mapIconDropsUrls[poi.variant] }
                                        clickable={ true }
                                        onClick={() => onPOISelect(poi)}
                                        zIndex={ isFocusedMarker(poi) ? 100 : 1 } />)
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