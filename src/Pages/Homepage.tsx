import React, { Fragment } from "react";


import "./Homepage.scss"
import MotoRoutesList from "../Components/MotoRoute/MotoRoutesList";
import { MotoRouteType } from "../Types/MotoRoutesTypes";
import { useGetMotoRoutes } from "../Actions/MotoRoutesActions";

const Homepage = () => {

    const [motoRoutesList, motoRoutesListLoading] = useGetMotoRoutes();

    return (
        <Fragment>
            
            <div className="row">
                <div className="col-md-7">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Faucibus purus in massa tempor nec feugiat nisl pretium. Eget mauris pharetra et ultrices neque ornare. 
                        Risus feugiat in ante metus dictum at tempor commodo. Adipiscing enim eu turpis egestas pretium aenean. 
                        Malesuada pellentesque elit eget gravida cum. Non consectetur a erat nam. Tristique senectus et netus et malesuada. 
                        Mi sit amet mauris commodo quis imperdiet massa tincidunt nunc. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. 
                        Euismod lacinia at quis risus sed vulputate odio ut. Donec pretium vulputate sapien nec sagittis aliquam. 
                    </p>
                </div>
                <div className="col-md-5">
                    <MotoRoutesList motoRoutesList={ motoRoutesList } />
                </div>
            </div>
        </Fragment>
    )
}

export default Homepage;