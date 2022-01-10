import React, { Fragment, useEffect, useState } from "react";
import MotoRouteEditorMap from "../Components/MotoRoute/Editor/MotoRouteEditorMap";
import MotoRouteDetailsEditor from "../Components/MotoRoute/Editor/MotoRouteEditorDetails";
import { Navigate, useMatch, useNavigate } from "react-router-dom";
import { POIType, POIVariant } from "src/Types/MotoRoutesTypes";
import { initialRouteData, MotoRouteDetailsDataType, MOTO_ROUTE_NAME_LENGTH_BOUNDS, FieldErrorType as MotoRouteFieldErrorType, blankError as motoRouteBlankError, MOTO_ROUTE_DESCRIPTION_LENGTH_BOUNDS } from "src/Components/MotoRoute/Editor/MotoRouteEditorDetailsTab";
import { createNewMotoRoute } from "src/Actions/MotoRoutesActions";
import { toast } from "react-toastify";
import ToasterStyles from "../ToasterStyles/ToasterStyles"

enum addModes {
    NONE,
    ADD_WAYPOINT,
    ADD_POI
}

const MotoRouteEditor = () => {

    const navigate = useNavigate()
    const urlMatch = useMatch('/routes/editor/:tab')
    const urlMatchForTabChange = useMatch('/routes/editor/*')

    // ========================= ROUTE DATA ============================================

    const [motoRouteDetailsData, setMotoRouteDetailsData] = useState<MotoRouteDetailsDataType>(initialRouteData);


    const handleRouteDataChange = (field: string, newVal: any) => {
        setMotoRouteDetailsData({ 
            ...motoRouteDetailsData, 
            [field]: newVal
        })
    }


    // ==================================================================================


    // ======================== WAYPOINTS AND ROUTES =====================================

    const [route, setRoute] = useState<{lat: number, lng: number}[]>([])
    const [pois, setPois] = useState<POIType[]>([]);

    const [selectedPOI, setSelectedPOI] = useState<POIType | null>(null)
    const [hoverPOI, setHoverPOI] = useState<POIType | null>(null)

    const onPOIHover = (enter: boolean, poi: POIType) => {
        if (!enter && hoverPOI === poi) {
            setHoverPOI(null);
        } else if (enter) {
            setHoverPOI(poi);
        }
    }

    const selectPOI = (poi: POIType | null) => {
        // Move to POI tabs when selected
        if (urlMatch !== null && poi !== null) {
            navigate(`${urlMatchForTabChange?.pathnameBase}/poi`)
        } else {
            console.log("This should not be here")
        }
        setSelectedPOI(poi);
    }

    const [addMode, setAddMode] = useState<addModes>(addModes.NONE)


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
            navigate(`${urlMatchForTabChange?.pathnameBase}/route`)
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
                setSelectedPOI(newPoi)
            } else {
                console.log("Cannot add two POIS in the same location")
            }
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

    const removePOI = (poi_id: number) => {
        let poi_index = pois.findIndex(item => item.id === poi_id);
        if (poi_index < 0) {
            throw new Error(`POI of index ${poi_id} not in poi array`)
        }

        var poisCopy = [...pois]
        poisCopy.splice(poi_index, 1)
        setPois(poisCopy);
    }

    const handlePOIDetailsChange = (poi_id: number, field: string, value: any) => {
        let poi_index = pois.findIndex(item => item.id === poi_id);
        if (poi_index < 0) {
            throw new Error("There is no poi with ID " + poi_id.toString())
        }

        let pois_copy = [...pois]

        pois_copy[poi_index] = {
            ...pois_copy[poi_index],
            [field]: value
        }

        setPois(pois_copy)
    }

    // ========================================================================================

    // ===================== SUBMIT HANDLING ================================================

    const resetRoute = () => {
        setMotoRouteDetailsData(initialRouteData)
        setRoute([])
        setPois([])
        
        setMotoRouteFieldErrors(motoRouteBlankError)

        navigate(`${urlMatchForTabChange?.pathnameBase}/details`)
    }

    const [motoRouteFieldErrors, setMotoRouteFieldErrors] = useState<MotoRouteFieldErrorType>(motoRouteBlankError)

    const validate_moto_route_data = (motoRouteDetailsData: MotoRouteDetailsDataType): boolean => {
        let input_valid = true
        let newErrors: MotoRouteFieldErrorType = {...motoRouteBlankError}


        if (motoRouteDetailsData.name.length < MOTO_ROUTE_NAME_LENGTH_BOUNDS.min) {
            newErrors.name = `Name must be at least ${MOTO_ROUTE_NAME_LENGTH_BOUNDS.min} characters in length`
            input_valid = false
        }

        if (motoRouteDetailsData.name.length > MOTO_ROUTE_NAME_LENGTH_BOUNDS.max) {
            newErrors.name = `Name must be at most ${MOTO_ROUTE_NAME_LENGTH_BOUNDS.max} characters in length`
            input_valid = false
        }

        if (motoRouteDetailsData.description.length < MOTO_ROUTE_DESCRIPTION_LENGTH_BOUNDS.min) {
            newErrors.description = `Description must be at least ${MOTO_ROUTE_DESCRIPTION_LENGTH_BOUNDS.min} characters in length`
            input_valid = false
        }

        if (motoRouteDetailsData.description.length > MOTO_ROUTE_DESCRIPTION_LENGTH_BOUNDS.max) {
            newErrors.description = `Description must be at most ${MOTO_ROUTE_DESCRIPTION_LENGTH_BOUNDS.max} characters in length`
            input_valid = false
        }

        setMotoRouteFieldErrors(newErrors)

        return input_valid
    }

    const submitRoute = () => {
        let input_valid = true

        input_valid = validate_moto_route_data(motoRouteDetailsData)
        // if (!input_valid) {
        //     toast.error("Route not added. There is a problem with the route details.", ToasterStyles)
        // }

        if (input_valid && route.length < 2) {
            toast.error("A route must have at least two waypoints.", ToasterStyles)
            input_valid = false
        }

        if (!input_valid) return

        // const res = await createNewMotoRoute(motoRouteDetailsData, route, pois)

        // if (res .status !== 200) {
        //     toast.error("Adding route not successful. Please check your inputs and try again later.", ToasterStyles)
        // } else {
        //     toast.success(res.data.messages[0], ToasterStyles)
        //     navigate(`/routes/${res.data.new_id}/details`)
        // }
    }

    // =====================================================================================

    return (
        <Fragment>
            <div className="row display-flex map-details-container">
                <div className="col-md-8 moto-route-map-container">
                    <MotoRouteEditorMap
                        handleMapClick={ handleMapClick }
                        route={ route }
                        pois={ pois }
                        selectedPOI={ selectedPOI }
                        hoveredPOI={ hoverPOI }
                        onPOISelect={ selectPOI }
                    />
                </div>


                <div className="col-md-4 moto-route-details-container">
                    <MotoRouteDetailsEditor 
                        route={ route }
                        setRoute={ setRoute }
                        pois={ pois }
                        setPois={ setPois }
                        selectedPOI={ selectedPOI }
                        onPOISelect={ selectPOI }
                        removeWaypoint={ removeWaypoint }
                        onPOIHover={ onPOIHover }
                        handlePOIDetailsChange={ handlePOIDetailsChange }
                        removePOI={ removePOI }
                        resetRoute={ resetRoute }
                        submitRoute={ submitRoute }
                        motoRouteDetailsData={ motoRouteDetailsData }
                        handleRouteDataChange= { handleRouteDataChange }
                        motoRouteFieldErrors= { motoRouteFieldErrors }
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default MotoRouteEditor;


