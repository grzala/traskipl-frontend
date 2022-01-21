import React, { Fragment, useEffect, useState } from "react";


import "./Homepage.scss"
import MotoRoutesList from "../Components/MotoRoute/MotoRoutesList";
import { useGetInAreaRecentMotoRoutes, useGetRecentMotoRoutes } from "../Actions/MotoRoutesActions";
import { MotoRouteType } from "../Types/MotoRoutesTypes";
import HomepageMapComponent from "src/Components/HomepageMapComponent";

const Homepage = () => {

    const [currentlyDisplayedRoute, setCurrentlyDisplayedRoute] = useState<MotoRouteType | null>(null)
    const [pointOfSearch, setPointOfSearch] = useState<{lat: number, lng: number} | null>(null)

    const [recentMotoRoutes, recentMotoRoutesIsLoading, recentMotoRoutesListLoadedOnce] = useGetRecentMotoRoutes();
    const [inAreaMotoRoutes, inAreaMotoRoutesIsLoading] = useGetInAreaRecentMotoRoutes(pointOfSearch);
    const [motoRoutesList, setMotoRoutesList] = useState<MotoRouteType[]>([])
    const [motoRoutesListLoading, setMotoRoutesListLoading] = useState<boolean>(true)

    useEffect(() => {
        if (pointOfSearch === null) {
            setMotoRoutesList(recentMotoRoutes)
            setMotoRoutesListLoading(recentMotoRoutesIsLoading)
        } else {
            setMotoRoutesList(inAreaMotoRoutes)
            setMotoRoutesListLoading(inAreaMotoRoutesIsLoading)
        }
    }, [
        recentMotoRoutes, 
        recentMotoRoutesIsLoading, 
        inAreaMotoRoutes,
        inAreaMotoRoutesIsLoading,
        pointOfSearch
    ])



    const onRouteHover = (enter: boolean, routeToDisplayId: number) => {
        if (!enter) {
            return
        }

        if (currentlyDisplayedRoute !== null && currentlyDisplayedRoute.id === routeToDisplayId) {
            return // Do not change state if the state would be changed to what it already is
        }
        
        let routeToDisplay = motoRoutesList.find((route) => route.id === routeToDisplayId)

        if (routeToDisplay === undefined) {
            console.log("Error: route of id" + routeToDisplayId + " not in route array")
            return
        }

        setCurrentlyDisplayedRoute(routeToDisplay)
    }


    const handleMapClick = (e: any) => {
        var lat = e.latLng.lat()
        var lng = e.latLng.lng()

        setCurrentlyDisplayedRoute(null)
        setPointOfSearch({lat: lat, lng: lng})
    }

    return (
        <Fragment>
            
            <div className="row">
                <div className="col-md-7">
                    <HomepageMapComponent 
                        route={currentlyDisplayedRoute} 
                        handleMapClick={handleMapClick}
                        pointOfSearch={pointOfSearch}
                    />
                </div>
                <div className="col-md-5">
                    <div style={{ maxHeight: "40em" }}>
                        <MotoRoutesList 
                            title={pointOfSearch === null ? "Recently added routes" : "Routes in area"} 
                            routes={ motoRoutesList } 
                            isLoading={
                                (pointOfSearch !== null && motoRoutesListLoading) ||
                                (pointOfSearch === null && (!recentMotoRoutesListLoadedOnce))
                            }
                            onHover={onRouteHover}
                        />
                    </div>
                </div>
            </div>
            <h5 style={{ marginTop: "1em" }}>
                Click on the map to show routes in the area of the click.
                Hover on a route in the list on the right to display the route on the map.
                Click on the route in the list to see more details.
            </h5>
        </Fragment>
    )
}

export default Homepage;