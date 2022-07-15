import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export class UserBusiness {

    async createUser(user: UserInputDTO) {

        const idGenerator = new IdGenerator();
        const id = idGenerator.generateId();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hashText(user.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }   

    async getUserByEmail(user: LoginInputDTO) {
        console.log(user)
        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);

        //ver se email existe no banco de dados


        //criptografar senha (hash a senha)
        const hashManager = new HashManager();
        const hashCompare = await hashManager.comparePlainTextToHashedPassword(user.password, userFromDB.getPassword());


        //se nao bater na base de dados, ou seja login errado dar erro


        //se tiver certo, gerar um token 
        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) { //MANDAR ERRO
            throw new Error("Invalid Password!");
        }
        console.log(accessToken)
        return accessToken;
    }
}