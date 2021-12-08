import axios from "axios"
import { useCallback, useEffect, useState } from "react";
import { MotoRouteType } from "../Types/MotoRoutesTypes";
import { handleAxiosErrors } from "./ErrorHandling";



function getMotoRoutes() {
    return axios.get(
        'http://localhost:3000/api/moto_routes',
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
        `http://localhost:3000/api/moto_routes/${id}`,
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
            return;
        }

        setLoading(true);
        var response = await getMotoRoute(id)

        if (response.status !== 200) {
            console.log("Something went wrong when getting moto Routes")
            console.log(response)
            setMotoRoute(null)
            return
        }
        
        const _motoRoutes = response.data.moto_route as MotoRouteType
        
        setMotoRoute(_motoRoutes)
        setLoading(false);
    }, [id])

    useEffect(() => { _getMotoRoute() }, [_getMotoRoute])

    return [ motoRoute, loading ]
}