import { genSalt,hash } from "bcrypt";

const generateHashedPassword = async (saltIteration: number, raw_password: string): Promise<string> => {
    const salt = await genSalt(saltIteration);
    const hashedPassword = await hash(raw_password, salt);
    return hashedPassword;
};

export default generateHashedPassword;
