import React, { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { MotoRouteListAPITypes, useGetBigListTopMotoRoutes } from "src/Actions/MotoRoutesActions";
import MotoRoutesList from "src/Components/MotoRoute/MotoRoutesList";

import Pagination from "react-js-pagination";

import { toast } from 'react-toastify';
import ToasterStyles from "../ToasterStyles/ToasterStyles"
import { userContext } from "src/Contexts/UserContext";


const ROUTES_PER_PAGE: number = 10

const MotoRouteBigListPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [listType, setListType] = useState<MotoRouteListAPITypes>(MotoRouteListAPITypes.NONE)
    const [requestedUserId, setRequestedUserId] = useState<number | null>(null)

    const navigate = useNavigate()
    const urlMatch = useMatch('/moto_route_list/:type/:page/*')


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
                setRequestedUserId(null)
                break
            case "user_routes":
                setListType(MotoRouteListAPITypes.USER_ROUTES)
                let new_reqUser = Number(urlMatch.params["*"])
                if (new_reqUser !== undefined || isNaN(new_reqUser)) {
                    setRequestedUserId(new_reqUser)
                } else {
                    throw new Error("You must specify which user's routes you request")
                }
                break
            case "user_favourites":
                setListType(MotoRouteListAPITypes.USER_FAVOURITES)
                setRequestedUserId(null)
                if (user.user === null) {
                    toast.error("You must be logged in to see this page", ToasterStyles)
                    navigate("/")
                }
                break
            default:
                console.log("EROR: no list type specified")
                setListType(MotoRouteListAPITypes.NONE)
                setRequestedUserId(null)
                navigate("/")
                break
        }
        

    }, [urlMatch, navigate, user.user])

    const [motoRoutesList, motoRoutesListLoading, loadedOnce, totalRoutes, userFullName] = useGetBigListTopMotoRoutes(currentPage, listType, requestedUserId);

    const onChangePage = (new_page: number) => {
        navigate(`/moto_route_list/${urlMatch?.params.type}/${new_page}`)
    }

    const _getListTitle = (type: MotoRouteListAPITypes, userFullName: string): string => {

        switch(type) {
            case MotoRouteListAPITypes.TOP:
                return "Top ranked routes"
            case MotoRouteListAPITypes.USER_ROUTES:
                return "Routes added by: " + userFullName
            case MotoRouteListAPITypes.USER_FAVOURITES:
                return "Your favourite routes"
            default:
                return ""
        }
    }

    const getListTitle = useMemo((): string => {
        return _getListTitle(listType, userFullName)
    }, [listType, userFullName])

    return (
        <Fragment>
            <MotoRoutesList title={getListTitle} routes={motoRoutesList} isLoading={!loadedOnce && motoRoutesListLoading} />

            <div style={{
                margin: "0.8em 0",
                width: "100%"
            }}>
                {(loadedOnce || !motoRoutesListLoading) && motoRoutesList.length > 0 && (
                    <Pagination
                        innerClass="pagination pagination-center"
                        itemClass="page-item"
                        linkClass="page-link"            
                        activePage={Math.min(currentPage, Math.ceil(totalRoutes / ROUTES_PER_PAGE))}
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