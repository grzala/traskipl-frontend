import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CommentType } from "../Types/MotoRoutesTypes";
import { handleAxiosErrors } from "./ErrorHandling";
import ToasterStyles from "../ToasterStyles/ToasterStyles"

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

function insertComment(message: string) {
    return axios.post(
        `http://localhost:3000/api/comments`,
        {
            message: message
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

export function useGetComments(id: number | null): [ CommentType[], boolean , (message: string) => void ]  {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const _getComments = useCallback(async () => {
        if (id !== null) {
            setLoading(true);
            var response = await getComments(id)


            if (response.status !== 200) {
                console.log("Something went wrong when getting moto Routes")
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

    const _insertComment = async (message: string) => {
        var response = await insertComment(message)

        if (response.status !== 200) {
            console.log("Something went wrong when inserting comment")
            toast.error(response.data.messages.join(", "), ToasterStyles)
            return
        }
    }

    useEffect(() => { _getComments() }, [_getComments])

    return [ comments, loading, _insertComment ]
}