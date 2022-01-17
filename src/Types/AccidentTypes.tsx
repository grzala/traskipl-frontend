

export enum Injury {
    NONE = "NONE",
    LIGHT = "LIGHT", 
    HEAVY = "HEAVY", 
    DEATH = "DEATH",
}

export type AccidentType = {
    id: number,
    created_at: Date,
    
    original_id: string,
    coordinates: {lat: number, lng: number},
    date: Date,
    injury: Injury
}