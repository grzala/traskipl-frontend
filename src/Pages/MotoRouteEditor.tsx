import React, { Fragment, useState } from "react";
import MotoRouteCreatorMap from "../Components/MotoRoute/Editor/MotoRouteEditorMap";
import MotoRouteDetailsEditor from "../Components/MotoRoute/Editor/MotoRouteEditorDetails";

const MotoRouteCreator = () => {

    const [route, setRoute] = useState<{lat: number, lng: number}[]>([])

    const handleMapClick = (e: any) => {
        var lat = e.latLng.lat()
        var lng = e.latLng.lng()

        // Prevent adding two waypoints in same place. This isn't really possible if done manually
        let newWaypoint = {lat: lat, lng: lng}
        if (!route.includes(newWaypoint)) {
            setRoute([...route, newWaypoint])
        } else {
            console.log("Cannot add two waypoints in the same location")
        }
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
                        setRoute={ setRoute }
                        removeWaypoint={ removeWaypoint }
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default MotoRouteCreator;


