export enum POIVariant {
    FOOD = "FOOD",
    VISTA = "VISTA", 
    URBEX = "URBEX",
    DANGER = "DANGER",
    FUEL = "FUEL"
}

export type POIType = {
    name: string,
    description: string,
    coordinates: {lat: number, lng: number},
    variant: POIVariant
}

export type MotoRouteType = {
    _id: string,
    title: string,
    description: string,
    coordinates: {lat: number, lng: number}[],
    points_of_interest?: POIType[],
}