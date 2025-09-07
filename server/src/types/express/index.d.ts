import { JwtPayload } from "jsonwebtoken";

declare global{
    namespace Express{
        interface Request{
            user: { user: Payload} | JwtPayload
        }
    }
};

interface Payload {
    userId: string,
    iat: number
}