// import { useEffect, useState, useCallback } from "react";
//import axios from "axios";

export type MotoRouteType = {
    _id: string,
    title: string,
    description: string,
    coordinates: {x: number, y: number}[]
}

const tempRoutes = [
    {  
        _id: '1',
        title: "Mała pętla Bieszczadzka",
        description: "Małą pętla is a beautiful road everyone loves it very much this is the short variant",
        coordinates: [
            {x: 51.2123, y: 53.12331}
        ]
    },
    {
        _id: '2',
        title: "Duża pętla Bieszczadzka",
        description: "Małą pętla is a beautiful road everyone loves it very much this is the short variant",
        coordinates: [
            {x: 51.2123, y: 53.12331}
        ]
    },
    {
        _id: '3',
        title: "Jeziorsko",
        description: "Przejażdżka dookoła dziury z wodą",
        coordinates: [
            {x: 51.2123, y: 53.12331}
        ]
    },
]

export function getMotoRoutes() {
    return tempRoutes;
}

export function getMotoRoute(id: any) {
    let i = tempRoutes.findIndex(r => r._id === id)
    if (i >= 0) {
        return tempRoutes[i];
    }

    throw(Error("nah, dude, no such ID"))
}

// function getMotoRoutes<T>(): Promise<T[]> {
//     //return axios.get<ResourceType[]>('http://localhost:3000/api/resources').then((response) => response.data)
//     return new Promise(() => tempRoutes);
// }

// export function useGetMotoRoutes<T>(): [ T[], boolean, (resource: T[]) => void ]  {
//     const [motoRoutes, setMotoRoutes] = useState<T[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);

//     const _getMotoRoutes = useCallback(async () => {
//         setLoading(true);
//         const _motoRoutes = await getMotoRoutes<T>()
//         setMotoRoutes(_motoRoutes)
//         setLoading(false);
//     }, [])

//     useEffect(() => { _getMotoRoutes() }, [_getMotoRoutes])

//     return [ motoRoutes, loading, setMotoRoutes ]
// }