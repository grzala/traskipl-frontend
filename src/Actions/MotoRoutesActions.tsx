// import { useEffect, useState, useCallback } from "react";
//import axios from "axios";


import { loremIpsum } from 'react-lorem-ipsum';

import { MotoRouteType, POIVariant} from "../Types/MotoRoutesTypes"

const tempRoutes: MotoRouteType[] = [
    {  
        id: 1,
        title: "Mała pętla Bieszczadzka",
        description: "Mała pętla Bieszczadzka is a shorter variant of the famous loop road in the Bieszczady mountains. The loop takes us around the Solina lake, giving us a good taste of mountainous terrain we can expect on the bigger loop.",
        coordinates: [
            { lat: 49.470003, lng: 22.328589},
            { lat: 49.321988, lng: 22.668264},
            { lat: 49.304531, lng: 22.416348},
            { lat: 49.467955, lng: 22.320365},
        ],
        points_of_interest: [
            { 
                id: 1,
                name: "some FOOD",
                description: loremIpsum({p: 1})[0] + loremIpsum({p: 1})[0],
                coordinates: {lat: 49.394489, lng: 22.402796},
                variant: POIVariant.FOOD
            },
            { 
                id: 2,
                name: "some VISTA",
                description: loremIpsum({p: 1})[0] + loremIpsum({p: 1})[0],
                coordinates: {lat: 49.394489, lng: 22.422796},
                variant: POIVariant.VISTA
            },
            { 
                id: 3,
                name: "some URBEX",
                description: loremIpsum({p: 1})[0] + loremIpsum({p: 1})[0],
                coordinates: {lat: 49.394489, lng: 22.442796},
                variant: POIVariant.URBEX
            },
            { 
                id: 4,
                name: "some DANGER",
                description: loremIpsum({p: 1})[0] + loremIpsum({p: 1})[0],
                coordinates: {lat: 49.394489, lng: 22.462796},
                variant: POIVariant.DANGER
            },
            { 
                id: 5,
                name: "some FUEL",
                description: loremIpsum({p: 1})[0],
                coordinates: {lat: 49.394489, lng: 22.482796},
                variant: POIVariant.FUEL
            },
            { 
                id: 6,
                name: "some point",
                description: loremIpsum({p: 1})[0],
                coordinates: {lat: 49.394489, lng: 22.502796},
                variant: POIVariant.OTHER
            },
            
            
        ]
    },
    {
        id: 2,
        title: "Duża pętla Bieszczadzka",
        description: "Duża pętla Bieszczadzka is a longer variant of the famous loop road in the Bieszczady mountains. Constant hikes and descends, fantastic turns and beautiful scenery place it in the 'must ride' category of Polish motorcycle routes. The bigger loop also takes us deeper into the mountains and forests of the Bieszczady national park.",
        coordinates: [
            { lat: 49.470003, lng: 22.328589},
            { lat: 49.106309, lng: 22.649962},
            { lat: 49.213745, lng: 22.327127},
            { lat: 49.467955, lng: 22.320365},
        ]
    },
    {
        id: 3,
        title: "Jeziorsko",
        description: "A ride around the Jeziorsko artificial lake. Not very overwhelming. It is very uniqie to go there after September ends, as the lake is being drained of water from the winter. If you own a dirt bike you can try riding on the lake bed.",
        coordinates: [
            { lat: 51.691263, lng: 18.974299 }, 
            { lat: 51.716471, lng: 18.624769 }, 
            { lat: 51.864877, lng: 18.674026 },
            { lat: 51.830279, lng: 18.875813 }, 
        ]
    },
]

export function getMotoRoutes() {
    return tempRoutes;
}

export function getMotoRoute(id: number) {
    let i = tempRoutes.findIndex(r => r.id === id)
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
