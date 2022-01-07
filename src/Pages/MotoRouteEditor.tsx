import React, { Fragment, useEffect, useState } from "react";
import MotoRouteEditorMap from "../Components/MotoRoute/Editor/MotoRouteEditorMap";
import MotoRouteDetailsEditor from "../Components/MotoRoute/Editor/MotoRouteEditorDetails";
import { useMatch } from "react-router-dom";
import { POIType, POIVariant } from "src/Types/MotoRoutesTypes";

enum addModes {
    NONE,
    ADD_WAYPOINT,
    ADD_POI
}

const MotoRouteEditor = () => {

    const [route, setRoute] = useState<{lat: number, lng: number}[]>([])
    const [pois, setPois] = useState<POIType[]>([]);

    const [addMode, setAddMode] = useState<addModes>(addModes.NONE)


    const urlMatch = useMatch('/routes/editor/:tab')

    useEffect(() => {
        switch(urlMatch?.params.tab) {
            case "details": // On details, same behaviour as on route
            case "route":
                setAddMode(addModes.ADD_WAYPOINT)
                break
            case "poi":
                setAddMode(addModes.ADD_POI)
                break
            default: 
                setAddMode(addModes.NONE)
                break
        }
    }, [urlMatch])

    const handleMapClick = (e: any) => {
        var lat = e.latLng.lat()
        var lng = e.latLng.lng()


        // Prevent adding two waypoints in same place. This isn't really possible if done manually
        let newCoords = {lat: lat, lng: lng}

        if (addMode === addModes.ADD_WAYPOINT) {
            if (!route.includes(newCoords)) {
                setRoute([...route, newCoords])
            } else {
                console.log("Cannot add two waypoints in the same location")
            }
        } else if (addMode === addModes.ADD_POI) {
            if (!pois.some((item) => item.coordinates === newCoords)) {
                let highestId = -1
                for (let i = 0; i < pois.length; i++) {
                    if (pois[i].id > highestId)
                        highestId = pois[i].id
                }

                let newPoi = {
                    id: highestId + 1,
                    name: "",
                    description: "",
                    coordinates: newCoords,
                    variant: POIVariant.OTHER
                }
                setPois([...pois, newPoi])
            } else {
                console.log("Cannot add two POIS in the same location")
            }
            console.log("addding poi")
        } else {
            throw new Error("No add mode selected")
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
                    <MotoRouteEditorMap
                        handleMapClick={ handleMapClick }
                        route={ route }
                    />
                </div>


                <div className="col-md-4 moto-route-details-container">
                    <MotoRouteDetailsEditor 
                        route={ route }
                        setRoute={ setRoute }
                        pois={ pois }
                        setPois={ setPois }
                        removeWaypoint={ removeWaypoint }
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default MotoRouteEditor;


