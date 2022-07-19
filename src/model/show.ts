
export enum DaysOfShow {
    sexta ="SEXTA",
    sabado ="SABADO",
    domingo ="DOMINGO"
}


export interface ShowInputDTO{
   week_day: DaysOfShow,
   start_time:number,
   end_time: number,
   band_id:string
}

export class Show {
    constructor(
        public id:string,
    public week_day: DaysOfShow,
    public start_time:number,
   public end_time: number,
   public band_id:string
    ){}
    }