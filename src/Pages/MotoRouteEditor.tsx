import React, { Fragment, useContext, useEffect, useState } from "react";
import MotoRouteEditorMap from "../Components/MotoRoute/Editor/MotoRouteEditorMap";
import MotoRouteDetailsEditor from "../Components/MotoRoute/Editor/MotoRouteEditorDetails";
import { useMatch, useNavigate } from "react-router-dom";
import { MotoRouteType, POIType, POIVariant } from "src/Types/MotoRoutesTypes";
import { initialRouteData, MotoRouteDetailsDataType, MOTO_ROUTE_NAME_LENGTH_BOUNDS, FieldErrorType as MotoRouteFieldErrorType, blankError as motoRouteBlankError, MOTO_ROUTE_DESCRIPTION_LENGTH_BOUNDS } from "src/Components/MotoRoute/Editor/MotoRouteEditorDetailsTab";
import { blankError as POIBlankError, POI_NAME_LENGTH_BOUNDS, POI_DESCRIPTION_LENGTH_BOUNDS } from "src/Components/MotoRoute/Editor/MotoRouteEditorPOIDraggable";
import { checkCanEditMotoRoute, createNewMotoRoute, deleteMotoRoute, getMotoRoute, updateMotoRoute } from "src/Actions/MotoRoutesActions";
import { toast } from "react-toastify";
import ToasterStyles from "../ToasterStyles/ToasterStyles"
import { CompositePOIFieldErrorType } from "src/Components/MotoRoute/Editor/MotoRouteEditorPOITab";
import { userContext } from "src/Contexts/UserContext";


enum addModes {
    NONE,
    ADD_WAYPOINT,
    ADD_POI
}

const MotoRouteEditor = () => {

    const [currentRouteID, setCurrentRouteID] = useState<number | null>(JSON.parse(window.localStorage.getItem('editorMotoRouteID') || 'null'))
    const [currentIDChanged, setCurrentIDChanged] = useState<boolean>(false)

    const navigate = useNavigate()
    const urlMatch = useMatch('/routes/editor/:id/:tab')
    const urlMatchForTabChange = useMatch('/routes/editor/:id/*')


    // ========================== URL and redirects ====================================

    const user = useContext(userContext);
    useEffect(() => {
        if (!user.user) {
            toast.error("You must be logged in to use the editor.", ToasterStyles)
            navigate(`/`)
        }
    }, [user, navigate])

    // =================================================================================

    // ========================= ROUTE DATA ============================================

    const [motoRouteDetailsData, setMotoRouteDetailsData] = useState<MotoRouteDetailsDataType>(initialRouteData);


    const handleRouteDataChange = (field: string, newVal: any) => {
        setMotoRouteDetailsData((prevData) => ({ 
            ...prevData, 
            [field]: newVal
        }))
    }


    // ==================================================================================


    // ======================== Fetching data for editing =================================
    const changeRouteID = (id: number | null) => {
        if (id !== currentRouteID) {
            setCurrentRouteID(id) // Do this only if id was changed to prevent re-loading route data
            setCurrentIDChanged(true)
            window.localStorage.setItem('editorMotoRouteID', JSON.stringify(id));
        }
    }

    useEffect(() => {
        if (currentIDChanged) {
            resetRoute()
        }
    }, [currentIDChanged, currentRouteID])

    const setMotoRouteData = (fetchedData: MotoRouteType) => {
        let newData: MotoRouteDetailsDataType = {
            name: fetchedData.name,
            description: fetchedData.description,
            time_to_complete_h: fetchedData.time_to_complete_h,
            time_to_complete_m: fetchedData.time_to_complete_m,
            date_open: {day: fetchedData.date_open_day, month:fetchedData.date_open_month},
            date_closed: {day: fetchedData.date_closed_day, month:fetchedData.date_closed_month},
            difficulty: fetchedData.difficulty,
            open_all_year: fetchedData.open_all_year,
            distance: fetchedData.distance,
        }

        setRoute(fetchedData.coordinates)
        setMotoRouteDetailsData(newData)

        if (fetchedData.point_of_interests)
            setPois(fetchedData.point_of_interests)
        else 
            console.log("API returned null for POIs. This should not happen")
    }

    // ===================================================================================


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
            console.log("This should not happen")
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

        const handleRouteIDChange = async () => {
            let routeID = urlMatch?.params["id"]

            if (routeID != null && routeID != 'new') {
                let res = await checkCanEditMotoRoute(+routeID)
                
                // if (res.status === 200) {
                //     toast.error("Cannot edit route at this time. Try again later.", ToasterStyles)
                // }

                if (!res.data.can_edit) {
                    toast.error("You have no permissions to edit this route.", ToasterStyles)
                    navigate('/')
                }

            }


            if (routeID === "new") {
                changeRouteID(null)
            } else if (routeID) {
                changeRouteID(+routeID)
            } else {
                console.log("This should never happen")
            }
        }
        handleRouteIDChange()
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

    const resetRoute = async () => {
        setMotoRouteFieldErrors(motoRouteBlankError)
        setPOIFieldErrs({})

        if (currentRouteID === null) { // Preapare to create new route
            setMotoRouteDetailsData(initialRouteData)
            setRoute([])
            setPois([])
        } else { // Get data from api
            let res = await getMotoRoute(currentRouteID)

            if (res.status !== 200) {
                if (res.data?.messages) {
                    toast.error(`Error: ${res.data.messages.join(", ")}`, ToasterStyles);
                }
                return
            } 

            let motoRoute = res.data.moto_route as MotoRouteType

            setMotoRouteData(motoRoute)
        }

        navigate(`${urlMatchForTabChange?.pathnameBase}/details`)
    }

    const [motoRouteFieldErrors, setMotoRouteFieldErrors] = useState<MotoRouteFieldErrorType>(motoRouteBlankError)
    const [poiFieldErrs, setPOIFieldErrs] = useState<CompositePOIFieldErrorType>({})

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

    const validate_pois_data = (poiData: POIType[]): boolean => {
        let input_valid = true
        let newErrors: CompositePOIFieldErrorType = {}

        poiData.forEach((poi) => {
            newErrors[poi.id] = {...POIBlankError}

            if (poi.name.length < POI_NAME_LENGTH_BOUNDS.min) {
                newErrors[poi.id].name = `Name must be at least ${POI_NAME_LENGTH_BOUNDS.min} characters in length`
                input_valid = false
            }

            if (poi.name.length > POI_NAME_LENGTH_BOUNDS.max) {
                newErrors[poi.id].name = `Name must be at most ${POI_NAME_LENGTH_BOUNDS.max} characters in length`
                input_valid = false
            }

            if (poi.description.length < POI_DESCRIPTION_LENGTH_BOUNDS.min) {
                newErrors[poi.id].description = `Description must be at least ${POI_DESCRIPTION_LENGTH_BOUNDS.min} characters in length`
                input_valid = false
            }

            if (poi.description.length > POI_DESCRIPTION_LENGTH_BOUNDS.max) {
                newErrors[poi.id].description = `Description must be at most ${POI_DESCRIPTION_LENGTH_BOUNDS.max} characters in length`
                input_valid = false
            }
        })

        setPOIFieldErrs(newErrors)

        return input_valid
    }

    const submitRoute = async () => {
        let input_valid = true

        input_valid = validate_moto_route_data(motoRouteDetailsData)
        input_valid = validate_pois_data(pois) && input_valid

        if (route.length < 2) {
            toast.error("A route must have at least two waypoints.", ToasterStyles)
            input_valid = false
        }

        if (!input_valid) {
            toast.error("Route not added. There is a problem with the route details.", ToasterStyles)
            return
        } 

        let res = null
        if (currentRouteID === null) {
            res = await createNewMotoRoute(motoRouteDetailsData, route, pois)
        } else {
            res = await updateMotoRoute(currentRouteID, motoRouteDetailsData, route, pois)
        }

        if (res.status !== 200) {
            toast.error(res.data.messages[0], ToasterStyles)
        } else {
            toast.success(res.data.messages[0], ToasterStyles)
            navigate(`/routes/${res.data.id}/details`)
        }

    }

    // =====================================================================================
    

    // ====================== Persist data beteween refreshes ==========================

    useEffect(() => {
        let storedRoute = window.localStorage.getItem('route')
        if (storedRoute) 
            setRoute(JSON.parse(storedRoute));

        let storedPOIs = window.localStorage.getItem('pois')
        if (storedPOIs) 
            setPois(JSON.parse(storedPOIs));

        let storedMotoRouteData = window.localStorage.getItem('motoRouteDetailsData')
        if (storedMotoRouteData) 
            setMotoRouteDetailsData(JSON.parse(storedMotoRouteData));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('route', JSON.stringify(route));
    }, [route]);

    useEffect(() => {
        window.localStorage.setItem('pois', JSON.stringify(pois));
    }, [pois]);

    useEffect(() => {
        window.localStorage.setItem('motoRouteDetailsData', JSON.stringify(motoRouteDetailsData));
    }, [motoRouteDetailsData]);
    // =====================================================================================

    const removeRoute = async () => {
        if (currentRouteID === null) {
            throw new Error("Cannot remove route, this shouldn't be available to user")
        }


        let res = await deleteMotoRoute(currentRouteID)

        if (res.status !== 200) {
            toast.error(res.data.messages[0], ToasterStyles)
        } else {
            toast.success(res.data.messages[0], ToasterStyles)
            navigate(`/`)
        }
    }

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
                        handleRouteDataChange= { handleRouteDataChange }
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
                        poiFieldErrs={ poiFieldErrs }
                        removeBtnAvailable={ currentRouteID !== null }
                        removeRoute={ removeRoute }
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default MotoRouteEditor;


