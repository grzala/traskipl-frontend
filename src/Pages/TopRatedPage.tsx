import React, { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useGetMotoRoutes, useGetTopMotoRoutes } from "src/Actions/MotoRoutesActions";
import MotoRoutesList from "src/Components/MotoRoute/MotoRoutesList";


const TopRatedPage = () => {

    const [page, setPage] = useState<number>(0)
    const navigate = useNavigate()
    const urlMatch = useMatch('/top/:page')

    useEffect(() => {
        if (urlMatch === null) {
            navigate("/top/1")
            return
        }

        let new_page = Number(urlMatch.params.page)

        if (new_page === undefined || isNaN(new_page)) {
            throw new Error("Page not defined")
        }

        setPage(new_page)
        

    }, [urlMatch])

    const [motoRoutesList, motoRoutesListLoading] = useGetTopMotoRoutes(0);

    return (
        <MotoRoutesList title={"Top rated routes"} routes={motoRoutesList} isLoading={motoRoutesListLoading} />
    )
}

export default TopRatedPage