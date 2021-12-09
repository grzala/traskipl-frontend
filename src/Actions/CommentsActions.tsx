import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { CommentType } from "../Types/MotoRoutesTypes";
import { handleAxiosErrors } from "./ErrorHandling";

function getComments(id: number) {
    return axios.get(
        `http://localhost:3000/api/moto_routes/${id}/comments`,
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

export function useGetComments(id: number | null): [ CommentType[], boolean /*, (resource: MotoRouteType[]) => void*/ ]  {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const _getComments = useCallback(async () => {
        if (id !== null) {
            setLoading(true);
            var response = await getComments(id)


            if (response.status !== 200) {
                console.log("Something went wrong when getting moto Routes")
                console.log(response)
                setComments([])
                return
            }
            
            const _comments = response.data as CommentType[]
            
            setComments(_comments)
            setLoading(false);
        } else {
            setComments([])
        }
    }, [id])

    useEffect(() => { _getComments() }, [_getComments])

    return [ comments, loading ]
}