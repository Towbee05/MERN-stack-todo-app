import jwt from 'jsonwebtoken';
import { generateToken } from './generateUserToken';
import letTheCatOutOfTheBag from './config';
import { Response } from 'express';

// Genererate user token 

// Validate users token 
const jwt_secret: string = letTheCatOutOfTheBag('SECRET_JWT_KEY');
const isValidToken = (token:string) => jwt.verify(token, jwt_secret);
type FeedCookies = {
    res: Response,
    userId: string,
    refreshToken: string
};

// Attach response to cookie
const feedCookie = ({res, userId, refreshToken}: FeedCookies) => {   
    const accessTokenJWT: string = generateToken({userId});
    // const refreshTokenJWT: string = generateToken({userId, refreshToken});
    // const oneDayinMilliSecs =  1000 * 60 * 60 * 24;
    const accessTokenExpires =  1000 * 60 * 60;
    // const refreshTokenExpires = 1000 * 60 * 60 * 24 * 30;

    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        signed: true,
        expires: new Date(Date.now() + accessTokenExpires)
    });
    // res.cookie('refreshToken', refreshTokenJWT, {
    //     httpOnly: true,
    //     signed: true,
    //     expires: new Date(Date.now() + refreshTokenExpires)
    // });
};

export {
    isValidToken, 
    feedCookie
};