import React, { Fragment, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { useGetTopMotoRoutes } from "src/Actions/MotoRoutesActions";
import MotoRoutesList from "src/Components/MotoRoute/MotoRoutesList";

import Pagination from "react-js-pagination";

const ROUTES_PER_PAGE: number = 10

const TopRatedPage = () => {
    const [loadedOnce, setLoadedOnce] = useState<boolean>(false)

    const [currentPage, setCurrentPage] = useState<number>(0)

    const navigate = useNavigate()
    const urlMatch = useMatch('/top/:page')

    useEffect(() => {
        if (urlMatch === null) {
            navigate("/top/1")
            return
        }

        let new_page = Number(urlMatch.params.page)

        if (new_page === undefined || isNaN(new_page)) {
            navigate("/top/1")
            return
        }

        setCurrentPage(new_page)
        

    }, [urlMatch, navigate])

    const [motoRoutesList, motoRoutesListLoading, totalRoutes] = useGetTopMotoRoutes(currentPage);

    useEffect(() => {
        if (!motoRoutesListLoading && motoRoutesList.length > 0) {
            setLoadedOnce(true)
        }
    }, [motoRoutesListLoading, motoRoutesList])

    const onChangePage = (new_page: number) => {
        navigate(`/top/${new_page}`)
    }

    return (
        <Fragment>
            <MotoRoutesList title={"Top rated routes"} routes={motoRoutesList} isLoading={!loadedOnce && motoRoutesListLoading} />

            <div style={{
                margin: "0.8em 0",
                width: "100%"
            }}>
                {(loadedOnce || !motoRoutesListLoading) && (
                    <Pagination
                        innerClass="pagination pagination-center"
                        itemClass="page-item"
                        linkClass="page-link"            
                        activePage={currentPage}
                        itemsCountPerPage={ROUTES_PER_PAGE}
                        totalItemsCount={totalRoutes}
                        pageRangeDisplayed={5}
                        onChange={onChangePage}
                    />
                )}
            </div>
        </Fragment>
    )
}

export default TopRatedPage