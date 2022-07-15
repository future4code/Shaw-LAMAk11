import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            }

            const userBusiness = new UserBusiness();
            await userBusiness.createUser(input);

            const token = await userBusiness.getUserByEmail({email: input.email, password: input.password});

            res.status(200).send({ token });

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {
           
            const {email, password}=req.body

            const loginData: LoginInputDTO = {
                email,
                password
            }
            if(!email || !password) { 
                throw new Error("prenchimento obrigatorio");
                
             }

            //deveria ser se tem erro  no usario e senha
       

            const userBusiness = new UserBusiness();
            const token = await userBusiness.getUserByEmail(loginData);

            res.status(200).send({ token });

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}