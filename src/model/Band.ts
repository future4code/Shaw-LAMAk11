export interface BandRegistrationInputDTO{
    name:string, 
    musicGenre: string, 
    responsible:string,
    adminId:string
}

export type Band = {
    id:string, 
    name:string, 
    music_genre:string, 
    responsible:string
}