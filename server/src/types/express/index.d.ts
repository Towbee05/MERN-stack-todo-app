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

interface Task {
    id?: string,
    name: string,
    completed: boolean,
    user: string,
    timestamp? : Date
};


export type { Task }