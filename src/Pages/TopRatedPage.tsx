import React from "react";
import { useGetMotoRoutes } from "src/Actions/MotoRoutesActions";
import MotoRoutesList from "src/Components/MotoRoute/MotoRoutesList";


const TopRatedPage = () => {


    const [motoRoutesList, motoRoutesListLoading] = useGetMotoRoutes();

    return (
        <MotoRoutesList title={"Top rated routes"} routes={motoRoutesList} isLoading={motoRoutesListLoading} />
    )
}

export default TopRatedPage