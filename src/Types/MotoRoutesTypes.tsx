import { UserType } from "./UserTypes"

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
    variant: POIVariant,
}

export type CommentType = {
    id: number,
    user_id: number,
    created_at: Date,
    author: string,
    message: string
}

export type MotoRouteType = {
    id: number,
    created_at: Date,
    user?: UserType,
    name: string,
    description: string,
    coordinates: {lat: number, lng: number}[],
    point_of_interests?: POIType[],
    score: number,
    comments?: CommentType[]
}