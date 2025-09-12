import 'dotenv/config';
import { Response, Request } from 'express';
import generateHashedPassword from '../utils/createHash';
import TaskUser from '../models/Users';
import { customAPIErrorClass } from '../errors/custom-error';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateUserToken';
import letTheCatOutOfTheBag from '../utils/config';
import { StatusCodes } from 'http-status-codes';
import logger from '../../services/logger.services';

type SignupRequest = {
    username: string,
    email: string, 
    password: string,
    confirm_password: string
};

type LoginRequest = {
    email: string,
    password: string
};

type ApiRespone<T= any> = {
    success: boolean,
    message: string,
    data? : T,
    error? : string
};

// type UserData = {
//     _id: string,
//     email:string, 
//     password: string,
//     createdAt: Date,
//     updatedAt: Date,
//     __v: number

// };


const signupController = async (req: Request<{}, {}, SignupRequest >, res: Response<ApiRespone>):Promise<void> => {
    try{
        const { username, email, password, confirm_password } = req.body
        if (!username || !email || !password || !confirm_password) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Please input required field!',
                error: 'Bad Request'
            });
        };
        const emailAlreadyExist = await TaskUser.findOne({email});
        if (emailAlreadyExist) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Email is already taken',
                error: 'Bad Request'
            });
        } 
        const usernameAlreadyExist = await TaskUser.findOne({username});
        if (usernameAlreadyExist) {
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Username is already taken',
                error: 'Bad Request'
            });
        };
        if (password !== confirm_password){
            res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Provided password does not match',
                error: 'PASSWORD_MISMATCH'
            });
        };
        // Salt number for hashing. A number between 10 aand 12
        

        // Store user and hashed password
        const hashedPassword = await generateHashedPassword(11, password);
        const data = {username, email, password: hashedPassword}
        const user = await TaskUser.create(data);
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'New user created',
            data: {username, email}
        });  

    } catch (err) {
        logger.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal Server Error',
            error: 'server_error'
        })
    }
};

const loginController = async (req: Request<{}, {}, LoginRequest>, res: Response<ApiRespone>): Promise<void> => {
    const { email, password } = req.body; 
    if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Plese provide email and password',
            error: 'Invalid Credential'
        });
        return;
    }
    const user = await TaskUser.findOne({email});
    if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Invalid Credentials',
            error: 'Invalid Credential'
        });
        return;
    };

    // Compare user's password
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Invalid Credentials',
            error: 'Invalid Credential'
        });
        return;
    };
    const token = generateToken({userId: user.id});
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'User fetched successfully',
        data: { token }
    });
};

export type { ApiRespone };
export { signupController, loginController };