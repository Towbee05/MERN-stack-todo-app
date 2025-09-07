import jwt from 'jsonwebtoken';
import letTheCatOutOfTheBag from './config';

const secret_key = letTheCatOutOfTheBag('SECRET_JWT_KEY');  
type Payload = {
    userId: string,
    refreshToken?: string
};

const generateToken = ({ userId }: Payload): string => {
    const token = jwt.sign({ userId }, secret_key);
    return token;
};

export { generateToken };