import { BandDatabase } from "../data/BandDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Band, BandRegistrationInputDTO } from "../model/Band";
import { IdGenerator } from "../services/IdGenerator";
//fazer um BandDatabase 

export class BandBusiness {
    constructor(
        public idGenerator:IdGenerator,
        public userDatabase:UserDatabase, 
        public bandDatabase:BandDatabase){}

    async registerBand(newBandInformation:BandRegistrationInputDTO){
        //inserir uma banda nova na nossa base de dados

        //ver se o admin cadastrando a banda existe
        let {adminId} = newBandInformation; 
        if(await this.userDatabase.verifyUserById(adminId) === false)
        {
            throw new Error("Invalid Admin Credentials")
        }

        let {name, musicGenre, responsible} = newBandInformation;

        //criar uma id para a banda nova 
        let id = this.idGenerator.generateId(); 
        //cadastrar banda na base de dados 
        let newBand:Band = {
            id, 
            name, 
            music_genre: musicGenre, 
            responsible
        }
        await this.bandDatabase.createBand(newBand); 
    }

    async returnAllBands(){
        let bands = this.bandDatabase.getAllBands();
        return bands; 
    }

    async findBandByName(bandName:string){
        let band = await this.bandDatabase.getBandByName(bandName);
        return band[0]; 
    }

    async findBandById(bandId:string){
        let band = await this.bandDatabase.getBandById(bandId); 
        return band[0];
    }
}