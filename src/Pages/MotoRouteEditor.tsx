import React, { Fragment, useState } from "react";
import MotoRouteCreatorMap from "../Components/MotoRoute/Editor/MotoRouteEditorMap";
import MotoRouteDetailsEditor from "../Components/MotoRoute/Editor/MotoRouteEditorDetails";

const MotoRouteCreator = () => {

    const [route, setRoute] = useState<{lat: number, lng: number}[]>([])

    const handleMapClick = (e: any) => {
        var lat = e.latLng.lat()
        var lng = e.latLng.lng()

        setRoute([...route, {lat: lat, lng: lng}])
    }

    const removeWaypoint = (index: number) => {
        if (index < 0 || index >= route.length) {
            throw new Error(`${index} exceeds bounds of waypoint array`)
        }

        var routeCopy = [...route]
        routeCopy.splice(index, 1)
        setRoute(routeCopy);
    }


    return (
        <Fragment>
            <div className="row display-flex map-details-container">
                <div className="col-md-8 moto-route-map-container">
                    <MotoRouteCreatorMap
                        handleMapClick={ handleMapClick }
                        route={ route }
                    />
                </div>


                <div className="col-md-4 moto-route-details-container">
                    <MotoRouteDetailsEditor 
                    
                        route={ route }
                        removeWaypoint={ removeWaypoint }
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default MotoRouteCreator;


