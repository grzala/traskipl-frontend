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

function insertComment(moto_route_id: number, message: string) {
    return axios.post(
        `http://localhost:3000/api/moto_routes/${moto_route_id}/comments`,
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

function deleteComment(id: number) {
    return axios.delete(
        `http://localhost:3000/api/comments/${id}`,
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

export function useGetComments(moto_route_id: number | null): [ 
    CommentType[], 
    boolean, 
    (moto_route_id: number | null, message: string) => Promise<boolean>,
    (comment_id: number) => Promise<boolean> ] {

    const [comments, setComments] = useState<CommentType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const _getComments = useCallback(async () => {
        if (moto_route_id !== null) {
            setLoading(true);
            var response = await getComments(moto_route_id)


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
    }, [moto_route_id])

    const _insertComment = async (moto_route_id: number | null, message: string) => {
        if (moto_route_id) {
            var response = await insertComment(moto_route_id, message)

            if (response.status !== 200) {
                console.log("Something went wrong when inserting comment")
                toast.error("Adding comment unsuccessful: " + response.data.messages.join(", "), ToasterStyles)
                return false
            }

            var newComment = response.data as CommentType
            setComments([newComment, ...comments])

            return true;
        } else {
            alert("This should not happen in normal usage of the site")
            return false;
        }
    }

    const _deleteComment = async (id: number) => {
        var response = await deleteComment(id)

        if (response.status !== 200) {
            console.log("Something went wrong when deleting comment")
            toast.error("Deleting comment unsuccessful: " + response.data.messages.join(", "), ToasterStyles)
            return false
        }

        toast.success(response.data.messages.join(", "), ToasterStyles)
        var newComments = comments.filter((element) => element.id !== id )
        setComments(newComments)

        return true
    }

    useEffect(() => { _getComments() }, [_getComments])

    return [ comments, loading, _insertComment, _deleteComment ]
}