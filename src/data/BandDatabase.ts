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

    public async getAllBands(){
      try {
        let response = await this.getConnection().select('*').from(BandDatabase.TABLE_NAME);
        return response; 
      } catch (error:any) {
        throw new Error(error.sqlMessage || error.message)
      }
    }

    public async getBandByName(name:string){
      try {
        let response = await this.getConnection().select('*').from(BandDatabase.TABLE_NAME).whereRaw(`name like "%${name}%"`)
        return response; 
      } catch (error:any) {
        throw new Error(error.sqlMessage || error.message)
      }
    }

    public async getBandById(id:string){
      try {
        let response = await this.getConnection().select('*').where({id}).from(BandDatabase.TABLE_NAME)
        return response; 
      } catch (error:any) {
        
        throw new Error(error.sqlMessage || error.message)
      }
    }


}