import {Request, response, Response} from "express"; 
import { BandBusiness } from "../business/BandBusiness";
import { BandDatabase } from "../data/BandDatabase";
//preciso fazer bandBusiness 
import { UserDatabase } from "../data/UserDatabase";
import { BandRegistrationInputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


//processa as informações inicias do nosso endpoint
//neste caso se a autorização está certa 
// e se as informações do cadastro de banda estão certos

export class BandController {
   
    async signup(req:Request, res:Response){
        try {
            //1
            //ver se body esta certo
            let {name, musicGenre, responsible} = req.body; 

            //se algumas das informacoes de cadastro da banda estiverem vazias
            // mandar erro que a info esta incompleta
            if(name === undefined || musicGenre === undefined || responsible === undefined)
            {
                throw new Error("Campos 'name'(string), 'musicGenre'(string), 'responsible'(string) são obrigatórios!")
            }

            if(typeof name !== 'string') 
            {
                throw new Error("Campo 'name' tem que ser string")
            }

            if(typeof musicGenre !== 'string'){
                throw new Error("Campo 'musicGenre' tem que ser string")
            }

            if(typeof responsible !== 'string') 
            {
                throw new Error("Campo 'responsible' tem que ser string")
            }

            //2 ver se a autorização está certa 
            let token = req.headers.authorization as string; 

            //fazer um autenticador de token
            let tokenAuthenticator = new Authenticator(); 

            //processar token
            let authenticationData = tokenAuthenticator.getDataFromToken(token)

            //processar se o usuario é cliente ou admin do token
            let {id,role} = authenticationData; 

            //se o usuario não for ADMIN, enviar mensagem de erro
            if(role !== 'ADMIN')
            {
                throw new Error("Somente ADMINS podem cadastrar bandas!")
            }

            
            let newBandInformation:BandRegistrationInputDTO ={
                name, 
                musicGenre, 
                responsible,
                adminId: id
            }

            //chamar o bandBusiness para fazer cadastro
            let bandBusiness =  new BandBusiness(new IdGenerator(),new UserDatabase(), new BandDatabase)
            //mandar mensagem de cadastro efetuado com sucesso
            await bandBusiness.registerBand(newBandInformation);
            res.status(201).send({message: "Banda cadastrada com sucesso!"})

        } catch (error:any) {
            res.status(400).send({error: error.message}); 
        }
    }

    async getBandByNameOrId(req:Request, res:Response){
        try {
            let name =req.query.name as string; 
            let id = req.query.id as string; 
             let bandBusiness =  new BandBusiness(new IdGenerator(),new UserDatabase(), new BandDatabase)
            if(!name && !id)
            {
                //return all bands
                
                let response = await bandBusiness.returnAllBands();
                res.status(200).send({bands: response})
            }
            if(name)
            {
                //search for band name
                let response = await bandBusiness.findBandByName(name);
                res.status(200).send({band: response})
            }
            if(id)
            {
                //search for band id
                let response = await bandBusiness.findBandById(id); 
                res.status(200).send({band: response})
            }
        } catch (error:any) {
            res.status(400).send({error: error.message});
        }
    }

}