import axios from "axios"
import { useCallback, useEffect, useState } from "react";
import { MotoRouteType } from "../Types/MotoRoutesTypes";
import { currentUserType } from "../Types/UserTypes";
import { handleAxiosErrors } from "./ErrorHandling";



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
        var response = await getMotoRoutes()


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
    }, [])

    useEffect(() => { _getMotoRoutes() }, [_getMotoRoutes])

    return [ motoRoutes, loading ]
}


function getMotoRoute(id: number) {
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
    const [loading, setLoading] = useState<boolean>(false);

    const _getMotoRoute = useCallback(async () => {
        if (id === null) {
            console.log("Requested moto route id is null")
            setMotoRoute(null)
            setLoading(false);
            return;
        }

        setLoading(true);
        var response = await getMotoRoute(id)

        if (response.status !== 200) {
            console.log("Something went wrong when getting moto Routes")
            console.log(response)
            setMotoRoute(null)
            setLoading(false);
            return
        }
        
        const _motoRoutes = response.data.moto_route as MotoRouteType
        
        setMotoRoute(_motoRoutes)
        // setLoading(false);
    }, [id])

    useEffect(() => { _getMotoRoute() }, [_getMotoRoute])

    return [ motoRoute, loading ]
}

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

export function useGetMotoRouteVoteAndFav(id: number | null, currentUser: currentUserType): [ number | null, boolean, any, any ]  {
    const [userVote, setUserVote] = useState<number | null>(null);
    const [isFavourite, setIsFavourite] = useState<boolean>(false);

    const _getVoteAndFav = useCallback(async () => {
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