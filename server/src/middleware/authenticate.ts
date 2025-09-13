import { JwtPayload } from "jsonwebtoken";
import { isValidToken } from "../utils/jwt";
import { Request, Response, NextFunction } from "express";


const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    // Check header for token
    const authHeader: string | undefined = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'UNAUTHENTICATED', error: 'Please Login'})
    };
    if (authHeader && authHeader.startsWith('Token')){
        token = authHeader.split(' ')[1];
    }
    else if (req.cookies.token) {
        token = req.cookies.token
    };
    if (!token) {
        return res.status(401).json({ success: false, message: 'UNAUTHENTICATED', error: 'Please Login'})
    };
    try{
        const payload = isValidToken(token);
        // console.log(payload);
        req.user = {
            user: payload
        };
    } catch {
        return res.status(401).json({ success: false, message: 'UNAUTHENTICATED', error: 'Please Login'})
    };
    next();
};

export default authenticateUser;