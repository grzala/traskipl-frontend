import React, { Fragment, useContext, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { MotoRouteListAPITypes, useGetTopMotoRoutes } from "src/Actions/MotoRoutesActions";
import MotoRoutesList from "src/Components/MotoRoute/MotoRoutesList";

import Pagination from "react-js-pagination";

import { toast } from 'react-toastify';
import ToasterStyles from "../ToasterStyles/ToasterStyles"
import { userContext } from "src/Contexts/UserContext";


const ROUTES_PER_PAGE: number = 10

const MotoRouteBigListPage = () => {
    const [loadedOnce, setLoadedOnce] = useState<boolean>(false)

    const [currentPage, setCurrentPage] = useState<number>(0)
    const [listType, setListType] = useState<MotoRouteListAPITypes>(MotoRouteListAPITypes.NONE)

    const navigate = useNavigate()
    const urlMatch = useMatch('/moto_route_list/:type/:page')


    const user = useContext(userContext);

    useEffect(() => {
        if (urlMatch === null) {
            navigate("/")
            return
        }

        let new_page = Number(urlMatch.params.page)
        let new_list_type = urlMatch.params.type

        // Do this if no page provided or wrong page provided
        if (new_page === undefined || isNaN(new_page) || new_page < 0) {
            navigate(`/moto_route_list/${new_list_type}/1`)
            return
        }

        setCurrentPage(new_page)

        switch(new_list_type) {
            case "top":
                setListType(MotoRouteListAPITypes.TOP)
                break
            case "user_routes":
                setListType(MotoRouteListAPITypes.USER_ROUTES)
                if (user.user === null) {
                    toast.error("You must be logged in to see this page", ToasterStyles)
                    navigate("/")
                }
                break
            case "user_favourites":
                setListType(MotoRouteListAPITypes.USER_FAVOURITES)
                if (user.user === null) {
                    toast.error("You must be logged in to see this page", ToasterStyles)
                    navigate("/")
                }
                break
            default:
                console.log("EROR: no list type specified")
                setListType(MotoRouteListAPITypes.NONE)
                navigate("/")
                break
        }
        

    }, [urlMatch, navigate])

    const [motoRoutesList, motoRoutesListLoading, totalRoutes] = useGetTopMotoRoutes(currentPage, listType);

    useEffect(() => {
        if (!motoRoutesListLoading && motoRoutesList.length > 0) {
            setLoadedOnce(true)
        }
    }, [motoRoutesListLoading, motoRoutesList])

    const onChangePage = (new_page: number) => {
        navigate(`/moto_route_list/${urlMatch?.params.type}/${new_page}`)
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

export default MotoRouteBigListPage