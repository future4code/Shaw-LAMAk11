import * as bcrypt from "bcrypt";


export class HashManager {

    public async hashText(text: string): Promise<string> {
        const rounds = 12;
        const salt = await bcrypt.genSalt(rounds);
        const result = await bcrypt.hash(text, salt);
        return result;
    }

    public async comparePlainTextToHashedPassword(text: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(text, hash);
    }

}