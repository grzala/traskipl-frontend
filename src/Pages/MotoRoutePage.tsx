import React, { Fragment, useEffect, useState } from "react";

import { useParams } from "react-router-dom";


import { MotoRouteType} from "../Types/MotoRoutesTypes"
import { getMotoRoute } from "../Actions/MotoRoutesActions";


import MotoRouteMap from "../Components/MotoRoute/MotoRouteMap";

import "./MotoRoutePage.scss"
import MotoRouteDetails from "../Components/MotoRoute/MotoRouteDetails/MotoRouteDetails";
import MotoRouteComments from "../Components/MotoRoute/MotoRouteComments";
import MotoRouteAuthor from "../Components/MotoRoute/MotoRouteAuthor";

  
const MotoRoutePage = () => {
    const { id } = useParams()

    const [route, setRoute] = useState<MotoRouteType>();

    useEffect(() => {
        setRoute(getMotoRoute(id))
    }, [id])


    const [hoverPOI, setHoverPOI] = useState<string | null>(null);
    const [selectedPOI, setSelectedPOI] = useState<string | null>(null);
    const onPOIHover = (enter: boolean, poi_id: string) => {
        if (!enter && hoverPOI === poi_id) {
            setHoverPOI(null);
        } else if (enter) {
            setHoverPOI(poi_id);
        }
    }

    const onPOISelect = (poi_id: string) => {
        setSelectedPOI(poi_id);
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
                            onPOISelect={onPOISelect}
                        />   
                    )}
                    
                </div>
                <div className="col-md-4 moto-route-details-container">
                    { route && (
                        <MotoRouteDetails route={route} onPOIHover={onPOIHover} onPOISelect={onPOISelect} selectedPOI={selectedPOI}/>
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
                    </div>
                </div>
            </div>
        </Fragment>
      )
}

export default MotoRoutePage;


