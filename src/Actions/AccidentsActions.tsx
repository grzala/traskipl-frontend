import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { AccidentType } from "src/Types/AccidentTypes";
import { handleAxiosErrors } from "./ErrorHandling";

export type AccidentBoudns = {northEast: {lng: number, lat:number}, southWest: {lng: number, lat:number}}


export function getAccidentsByBounds(bounds: AccidentBoudns) {
    return axios.post(
        `${process.env.REACT_APP_API_SERVER}/accidents`,
        {
            bounds: bounds
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

export function useGetAccidentsByBounds(bounds: AccidentBoudns | null): [ AccidentType[], boolean ]  {
    const [accidents, setAccidents] = useState<AccidentType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const _getAccidentsByBounds = useCallback(() => {
        if (bounds === null) {
            console.log("No bounds provided to get accidents")
            setAccidents([])
            setLoading(false);
            return;
        }

        setLoading(true);

        getAccidentsByBounds(bounds).then((response) => {

            if (response.status !== 200) {
                console.log("Something went wrong when getting accidents by bounds")
                console.log(response)
                setLoading(false);
                return
            }
            
            const _accidents = response.data.accidents as AccidentType[]
            console.log(_accidents)
            
            setAccidents(_accidents)
            setLoading(false);
        })

    }, [bounds])

    useEffect(() => { _getAccidentsByBounds() }, [_getAccidentsByBounds])

    return [ accidents, loading ]
}