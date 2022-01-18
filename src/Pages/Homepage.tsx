import React, { Fragment, useState } from "react";


import "./Homepage.scss"
import MotoRoutesList from "../Components/MotoRoute/MotoRoutesList";
import { useGetMotoRoutes } from "../Actions/MotoRoutesActions";
import { MotoRouteType } from "../Types/MotoRoutesTypes";
import HomepageMapComponent from "src/Components/HomepageMapComponent";

const Homepage = () => {

    const [motoRoutesList, motoRoutesListLoading] = useGetMotoRoutes();
    const [currentlyDisplayedRoute, setCurrentlyDisplayedRoute] = useState<MotoRouteType | null>(null)
    const [pointOfSearch, setPointOfSearch] = useState<{lat: number, lng: number} | null>(null)



    const onRouteHover = (enter: boolean, routeToDisplayId: number) => {
        if (!enter) {
            return
        }
        
        let routeToDisplay = motoRoutesList.find((route) => route.id == routeToDisplayId)

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
                    <MotoRoutesList 
                        title={"Recently added routes"} 
                        routes={ motoRoutesList } 
                        isLoading={motoRoutesListLoading}
                        onHover={onRouteHover}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default Homepage;