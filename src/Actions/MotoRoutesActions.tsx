import axios from "axios"
import { useCallback, useEffect, useState } from "react";
// import { MotoRouteType } from "../Types/MotoRoutesTypes";
import { handleAxiosErrors } from "./ErrorHandling";



export function getMotoRoutes() {
    return axios.get(
        'http://localhost:3000/api/moto_routes',
        {'withCredentials': true}
    ).then((response) => {

        if (response.status !== 200) {
            console.log("Api error");
            console.log(response)
        }

        return response.data
    }).catch((error) => {
        return handleAxiosErrors(error)
    })
}

// export function useGetResources(): [ MotoRouteType[], boolean, (resource: MotoRouteType[]) => void ]  {
//     const [resources, setResources] = useState<MotoRouteType[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);

//     const _getResources = useCallback(async () => {
//         setLoading(true);
//         const _resources = await getResources()
//         setResources(_resources)
//         setLoading(false);
//     }, [])

//     useEffect(() => { _getResources() }, [_getResources])

//     return [ resources, loading, setResources ]
// }
