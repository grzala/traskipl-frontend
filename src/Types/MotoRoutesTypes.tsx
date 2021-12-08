export enum POIVariant {
    FOOD = "FOOD",
    VISTA = "VISTA", 
    URBEX = "URBEX",
    DANGER = "DANGER",
    FUEL = "FUEL",
    OTHER = "OTHER"
}

export type POIType = {
    id: number,
    name: string,
    description: string,
    coordinates: {lat: number, lng: number},
    variant: POIVariant
}

export type MotoRouteType = {
    id: number,
    name: string,
    description: string,
    coordinates: {lat: number, lng: number}[],
    points_of_interest?: POIType[],
}