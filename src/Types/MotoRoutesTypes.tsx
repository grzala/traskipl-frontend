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
    date_open_day: number,
    date_open_month: number,
    date_closed_day: number,
    date_closed_month: number,
    open_all_year: boolean,
    time_to_complete_h: number,
    time_to_complete_m: number,
    difficulty: number,
    coordinates: {lat: number, lng: number}[],
    point_of_interests?: POIType[],
    poi_count?: {[variant in POIVariant]: number}
    score: number,
    comments?: CommentType[]
}