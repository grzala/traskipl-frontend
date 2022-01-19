import axios from "axios"
import { useCallback, useEffect, useState } from "react";
import { MotoRouteDetailsDataType } from "src/Components/MotoRoute/Editor/MotoRouteEditorDetailsTab";
import { MotoRouteType, POIType } from "../Types/MotoRoutesTypes";
import { handleAxiosErrors } from "./ErrorHandling";


// ================ GET ALL MOTO ROUTES ===============================

function getMotoRoutes() {
    return axios.get(
        `${process.env.REACT_APP_API_SERVER}/moto_routes`,
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}

export function useGetMotoRoutes(): [ MotoRouteType[], boolean /*, (resource: MotoRouteType[]) => void*/ ]  {
    const [motoRoutes, setMotoRoutes] = useState<MotoRouteType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const _getMotoRoutes = useCallback(async () => {
        setLoading(true);
        getMotoRoutes().then((response) => {
            if (response.status !== 200) {
                console.log("Something went wrong when getting moto Routes")
                console.log(response)
                setMotoRoutes([])
                setLoading(false);
                return
            }
            
            const _motoRoutes = response.data.moto_routes as MotoRouteType[]
            
            setMotoRoutes(_motoRoutes)
            setLoading(false);
        })
    }, [])

    useEffect(() => { _getMotoRoutes() }, [_getMotoRoutes])

    return [ motoRoutes, loading ]
}

// ================ GET RECENT MOTO ROUTES ===============================

function getRecentMotoRoutes() {
    return axios.get(
        `${process.env.REACT_APP_API_SERVER}/moto_routes/recent`,
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}

export function useGetRecentMotoRoutes(): [ MotoRouteType[], boolean ]  {
    const [motoRoutes, setMotoRoutes] = useState<MotoRouteType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const _getMotoRoutes = useCallback(async () => {
        setLoading(true);
        getRecentMotoRoutes().then((response) => {
            if (response.status !== 200) {
                console.log("Something went wrong when getting moto Routes")
                console.log(response)
                setMotoRoutes([])
                setLoading(false);
                return
            }
            
            const _motoRoutes = response.data.moto_routes as MotoRouteType[]
            
            setMotoRoutes(_motoRoutes)
            setLoading(false);
        })
    }, [])

    useEffect(() => { _getMotoRoutes() }, [_getMotoRoutes])

    return [ motoRoutes, loading ]
}

// ================ GET IN AREA MOTO ROUTES ===============================

function getInAreaMotoRoutes(point: {lat: number, lng: number}) {
    return axios.post(
        `${process.env.REACT_APP_API_SERVER}/moto_routes/in_area`,
        {
            point: point
        },
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}

export function useGetInAreaRecentMotoRoutes(point: {lat: number, lng: number} | null): [ MotoRouteType[], boolean ]  {
    const [motoRoutes, setMotoRoutes] = useState<MotoRouteType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const _getMotoRoutes = useCallback(async () => {
        if (point === null) return
        
        setLoading(true);
        getInAreaMotoRoutes(point).then((response) => {
            if (response.status !== 200) {
                console.log("Something went wrong when getting moto Routes")
                console.log(response)
                setMotoRoutes([])
                setLoading(false);
                return
            }
            
            const _motoRoutes = response.data.moto_routes as MotoRouteType[]
            
            setMotoRoutes(_motoRoutes)
            setLoading(false);
        })
    }, [point])

    useEffect(() => { _getMotoRoutes() }, [_getMotoRoutes])

    return [ motoRoutes, loading ]
}

// ================ GET TOP MOTO ROUTES with page number ===============================

export enum MotoRouteListAPITypes {
    NONE = "none",
    TOP = "top",
    USER_ROUTES = "user_routes",
    USER_FAVOURITES = "user_favourites"
}

function getTopMotoRoutes(page: number, type: MotoRouteListAPITypes, user_id: number | null) {
    let url = `${process.env.REACT_APP_API_SERVER}/moto_routes/${type}/${page}`
    if (user_id !== null) {
        url += `/${user_id}`
    }
    return axios.get(
        url,
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}

export function useGetTopMotoRoutes(page: number, type: MotoRouteListAPITypes, user_id: number | null): [ MotoRouteType[], boolean , number, string]  {
    const [motoRoutes, setMotoRoutes] = useState<MotoRouteType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalRoutes, setTotalRoutes] = useState<number>(-1);
    const [userFullName, setUserFullname] = useState<string>("")

    const _getMotoRoutes = useCallback(async () => {
        if (type === MotoRouteListAPITypes.NONE) { // This should not happen. If if happens just abort API calling
            return;
        }

        // don't bother the API if wrong page number is provided. the Page will handle this and renew request with proper page number
        if (page <= 0) { 
            setLoading(false)
            setTotalRoutes(-1)
            setMotoRoutes([])
            setUserFullname("")
            return;
        }

        setLoading(true);
        getTopMotoRoutes(page, type, user_id).then((response) => {
            if (response.status !== 200) {
                console.log("Something went wrong when getting moto Routes")
                console.log(response)
                setMotoRoutes([])
                setTotalRoutes(-1)
                setLoading(false);
                setUserFullname("")
                return
            }
            
            const _motoRoutes = response.data.moto_routes as MotoRouteType[]
            
            setMotoRoutes(_motoRoutes)
            setTotalRoutes(response.data.total_routes)
            if (type === MotoRouteListAPITypes.USER_ROUTES) {
                setUserFullname(response.data.user_full_name)
            }
            setLoading(false);
        })
    }, [page, type, user_id])

    useEffect(() => { _getMotoRoutes() }, [_getMotoRoutes])

    return [ motoRoutes, loading, totalRoutes, userFullName ]
}


// ================ GET MOTO ROUTE BY ID ===============================

export function getMotoRoute(id: number) {
    return axios.get(
        `${process.env.REACT_APP_API_SERVER}/moto_routes/${id}`,
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}

export function useGetMotoRoute(id: number | null): [ MotoRouteType | null, boolean /*, (resource: MotoRouteType[]) => void*/ ]  {
    const [motoRoute, setMotoRoute] = useState<MotoRouteType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const _getMotoRoute = useCallback(async () => {
        if (id === null) {
            console.log("Requested moto route id is null")
            setMotoRoute(null)
            setLoading(false);
            return;
        }

        setLoading(true);

        getMotoRoute(id).then((response) => {
            if (response.status !== 200) {
                console.log("Something went wrong when getting moto Routes")
                console.log(response)
                setMotoRoute(null)
                setLoading(false);
                return
            }
            
            const _motoRoutes = response.data.moto_route as MotoRouteType
            
            setMotoRoute(_motoRoutes)
            setLoading(false);
        })
    }, [id])

    useEffect(() => { _getMotoRoute() }, [_getMotoRoute])

    return [ motoRoute, loading ]
}


// ================ Switch Fav ===============================

export function switchFavourite(route_id: number) {
    return axios.post(
        `${process.env.REACT_APP_API_SERVER}/moto_routes/switch_favourite`,
        {
            id: route_id
        },
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}


// ================ Vote ===============================
export function castVote(route_id: number, vote_score: number) {
    return axios.post(
        `${process.env.REACT_APP_API_SERVER}/moto_routes/cast_rating_vote`,
        {
            id: route_id,
            score: vote_score
        },
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}

// ================ Get current vote for user ===============================
export function get_users_vote(route_id: number) {
    return axios.get(
        `${process.env.REACT_APP_API_SERVER}/moto_routes/${route_id}/get_user_vote`,
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}


// ================ Check is fav for user ===============================
export function check_is_favourite(route_id: number) {
    return axios.get(
        `${process.env.REACT_APP_API_SERVER}/moto_routes/${route_id}/is_favourite`,
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}

// ================ Hook to get vote and fav? at the same time ===============================
export function useGetMotoRouteVoteAndFav(id: number | null): [ number | null, boolean, any, any ]  {
    const [userVote, setUserVote] = useState<number | null>(null);
    const [isFavourite, setIsFavourite] = useState<boolean>(false);

    const _getVoteAndFav = useCallback(() => {
        if (id === null) {
            console.log("Requested moto route id is null")
            return;
        }

        get_users_vote(id).then((response) => {
            if (response.status !== 200) {
                console.log("Something went wrong")
                console.log(response)
                setUserVote(null)
                return
            }
            
            setUserVote(response.data.user_score)
        })

        check_is_favourite(id).then((response) => {
            if (response.status !== 200) {
                console.log("Something went wrong")
                console.log(response)
                setIsFavourite(false)
                return
            }
            
            setIsFavourite(response.data.is_favourite)
        })
        
    }, [id])

    useEffect(() => { _getVoteAndFav() }, [_getVoteAndFav])

    return [ userVote, isFavourite, setUserVote, setIsFavourite ]
}

// ================ Create new route ===============================
export function createNewMotoRoute(
    data: MotoRouteDetailsDataType, 
    waypoints: {lat:number, lng: number}[], 
    pois: POIType[],
    googleMapsStaticApiUrl: string
    ) {

    return axios.post(
        `${process.env.REACT_APP_API_SERVER}/moto_routes`,
        {
            data: data,
            waypoints: waypoints,
            pois: pois,
            google_maps_static_api_url: googleMapsStaticApiUrl
        },
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}


// ================ Edit existing route ===============================
export function updateMotoRoute(
    route_id: number, 
    data: MotoRouteDetailsDataType, 
    waypoints: {lat:number, lng: number}[], 
    pois: POIType[],
    googleMapsStaticApiUrl: string
    ) {

    return axios.patch(
        `${process.env.REACT_APP_API_SERVER}/moto_routes/${route_id}`,
        {
            data: data,
            waypoints: waypoints,
            pois: pois,
            google_maps_static_api_url: googleMapsStaticApiUrl
        },
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}


// ================ delete route ===============================
export function deleteMotoRoute(route_id: number) {

    return axios.delete(
        `${process.env.REACT_APP_API_SERVER}/moto_routes/${route_id}`,
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}

// ================ Check if route can be edited by user ===============================
export function checkCanEditMotoRoute(route_id: number) {

    return axios.get(
        `${process.env.REACT_APP_API_SERVER}/moto_routes/${route_id}/can_edit`,
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}


// ================ Hook: Check if route can be edited by use ===============================
export function useCheckCanEditMotoRoute(route_id: number): [boolean] {
    const [canEdit, setCanEdit] = useState<boolean>(false)

    const _checkCanEdit = useCallback(() => {
        checkCanEditMotoRoute(route_id).then((res) => {
        
            if (res.status !== 200) {
                setCanEdit(false)
                return 
            }

            setCanEdit(res.data.can_edit)
        })
            
    }, [route_id])

    useEffect(() => { _checkCanEdit() }, [_checkCanEdit])

    return [canEdit]
}

