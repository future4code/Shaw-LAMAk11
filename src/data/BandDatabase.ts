import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase{

    private static TABLE_NAME = "Lama_Bandas"; 

    public async createBand(newBand:Band){
    
       try {
        await this.getConnection().insert(newBand).into(BandDatabase.TABLE_NAME);
       } catch (error:any) {
         throw new Error(error.sqlMessage || error.message)
       } 
        
    }; 

    

}