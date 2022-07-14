import {Request, response, Response} from "express"; 
// preciso fazer BandRegisterDTO 
//preciso fazer bandBusiness 
import { BaseDatabase } from "../data/BaseDatabase";
import { BandRegistrationInputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";


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

            if(responsible !== 'string') 
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
            //mandar mensagem de cadastro efetuado com sucesso

            res.status(201).send({message: "Banda cadastrada com sucesso!"})

        } catch (error:any) {
            res.status(400).send({error: error.message}); 
        }
    }

}