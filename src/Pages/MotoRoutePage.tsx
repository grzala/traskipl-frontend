import React, { Fragment, useEffect, useState } from "react";

import { useMatch, useNavigate, useParams } from "react-router-dom";


import { MotoRouteType, POIType} from "../Types/MotoRoutesTypes"
// import { getMotoRoute, getMotoRoutes } from "../Actions/MotoRoutesActions";


import MotoRouteMap from "../Components/MotoRoute/MotoRouteMap";

import "./MotoRoutePage.scss"
import MotoRouteDetails from "../Components/MotoRoute/MotoRouteDetails/MotoRouteDetails";
import MotoRouteComments from "../Components/MotoRoute/MotoRouteComments";
import MotoRouteAuthor from "../Components/MotoRoute/MotoRouteAuthor";
import MotoRoutesList from "../Components/MotoRoute/MotoRoutesList";

  
const MotoRoutePage = () => {
    const { id } = useParams()

    const [motoRoutesList, setMotoRoutesList] = useState<MotoRouteType[]>([])
    useEffect(() => {
        // setMotoRoutesList(getMotoRoutes())
    }, [])

    const navigate = useNavigate()
    const urlMatch = useMatch('/routes/:id/*')

    const [route, setRoute] = useState<MotoRouteType>();

    useEffect(() => {
        if (id != null) {
            // setRoute(getMotoRoute(+id))
        }
    }, [id])


    const [hoverPOI, setHoverPOI] = useState<POIType | null>(null);
    const [selectedPOI, setSelectedPOI] = useState<POIType | null>(null);
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
            navigate(`${urlMatch?.pathnameBase}/poi`)
        } else {
            console.log("This should not be here")
        }
        setSelectedPOI(poi);
    }

    const [poiMarkerFilter, setpoiMarkerFilter] = useState<boolean>(true);
    const poiMarkerFilterChange = (newVal: boolean) => {
        
        if (!newVal) { // set Selected to null when filter turned off
            selectPOI(null)
        }
        setpoiMarkerFilter(newVal)
    }

    return (
        <Fragment>
            <div className="row display-flex map-details-container">
                <div className="col-md-8 moto-route-map-container">
                    
                    {route && (
                        <MotoRouteMap 
                            motoRouteCoords={route.coordinates} 
                            motoRoutePOIs={route.points_of_interest} 
                            hoveredPOI={hoverPOI}
                            selectedPOI={selectedPOI}
                            onPOISelect={selectPOI}
                            poiMarkerFilter={poiMarkerFilter}
                        />   
                    )}
                    
                </div>
                <div className="col-md-4 moto-route-details-container">
                    { route && (
                        <MotoRouteDetails 
                            route={route} 
                            onPOIHover={onPOIHover} 
                            onPOISelect={selectPOI} 
                            selectedPOI={selectedPOI}
                            poiMarkerFilter={poiMarkerFilter}
                            poiMarkerFilterChange={poiMarkerFilterChange}
                            
                        />
                    )}
                </div>
            </div>


            <div className="moto-route-page-comments-wrapper mt-3 mb-3">
                <div className="row">
                    <div className="col-md-8 comments">
                        <MotoRouteComments />
                    </div>
                    <div className="col-md-4">
                        <MotoRouteAuthor />
                        <MotoRoutesList motoRoutesList={ motoRoutesList } />
                    </div>
                </div>
            </div>
        </Fragment>
      )
}

export default MotoRoutePage;


