import React, { Fragment, useEffect, useState } from "react";

import { Link, useMatch, useNavigate, useParams } from "react-router-dom";


import { POIType} from "../Types/MotoRoutesTypes"
// import { getMotoRoute, getMotoRoutes } from "../Actions/MotoRoutesActions";


import MotoRouteMap from "../Components/MotoRoute/MotoRouteMap";

import "./MotoRoutePage.scss"
import MotoRouteDetails from "../Components/MotoRoute/MotoRouteDetails/MotoRouteDetails";
import MotoRouteComments from "../Components/MotoRoute/MotoRouteComments";
import MotoRouteAuthor from "../Components/MotoRoute/MotoRouteAuthor";
import MotoRoutesList from "../Components/MotoRoute/MotoRoutesList";
import { useGetMotoRoute, useGetMotoRoutes } from "../Actions/MotoRoutesActions";
import { userContext } from "../Contexts/UserContext";

import ReactLoading from "react-loading";
  
const MotoRoutePage = () => {
    const { id } = useParams()

    const [motoRoutesList, motoRoutesListLoading] = useGetMotoRoutes();

    const navigate = useNavigate()
    const urlMatch = useMatch('/routes/:id/*')

    const [route, routeLoading] = useGetMotoRoute(id ? +id : null);

    useEffect(() => {
        
    }, [route])


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
        <userContext.Consumer>
            {({user}) => (
                <Fragment>
                    { !routeLoading && !route ? (
                        <h2 style={{ textAlign: 'center', marginTop: '2em' }}>
                            This route does not exist&nbsp;
                            <Link to="/">go back</Link>
                        </h2>
                    ) : (
                        <Fragment>
                            <div className="row display-flex map-details-container">

                                    <div className="col-md-8 moto-route-map-container">

                                        { routeLoading && (
                                            <div 
                                                className="vertical-align-placeholder"
                                                style={{backgroundColor: "#f0eaea"}}>
                                                <ReactLoading type={ 'spokes' } className="loading-placeholder" />
                                            </div>
                                        )}
                                        
                                        { !routeLoading && route && (
                                            <MotoRouteMap 
                                                route={route} 
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
                                                currentUser={user}
                                                route={route} 
                                                onPOIHover={onPOIHover} 
                                                onPOISelect={selectPOI} 
                                                selectedPOI={selectedPOI}
                                                poiMarkerFilter={poiMarkerFilter}
                                                poiMarkerFilterChange={poiMarkerFilterChange}
                                                isLoading={routeLoading}
                                            />
                                        )}
                                    </div>
                            </div>


                            <div className="moto-route-page-bottom-wrapper mt-3 mb-3">
                                <div className="row">
                                    <div className="col-md-8 moto-route-page-comments-container">
                                        <MotoRouteComments moto_route_id={route?.id || null} current_user={user} />
                                    </div>
                                    <div className="col-md-4" style={{height: "100px"}}>

                                        <MotoRouteAuthor author={route?.user || null} isLoading={routeLoading} />

                                        <div className="moto-route-page-list-container">
                                            <MotoRoutesList motoRoutesList={ motoRoutesList } isLoading={ motoRoutesListLoading } />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </Fragment>
            )
        }
    </userContext.Consumer>
    )
}

export default MotoRoutePage;


