import React, { Fragment } from "react";
import MotoRouteCreatorMap from "src/Components/MotoRoute/Creator/MotoRouteCreatorMap";
import MotoRouteDetailsEditor from "src/Components/MotoRoute/Creator/MotoRouteDetailsEditor";

const MotoRouteCreator = () => {
    return (
        <Fragment>
            <div className="row display-flex map-details-container">
                <div className="col-md-8 moto-route-map-container">
                    <MotoRouteCreatorMap />
                </div>


                <div className="col-md-4 moto-route-details-container">
                    <MotoRouteDetailsEditor />
                </div>
            </div>
        </Fragment>
    )
}

export default MotoRouteCreator;


