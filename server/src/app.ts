import express, { Request, Response } from 'express';
import cors from 'cors';
import authrouter from './routes/auth';
import taskrouter from './routes/task';
import connectDatabase from './db/connectDB';
import letTheCatOutOfTheBag from './utils/config';
import logger from '../services/logger.services';

const app = express();
const corsOption = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOption));
app.use(express.json());
app.use('/api/v1', authrouter);
app.use('/api/v1/tasks', taskrouter);

logger.info('Hello, node application');

const port: number = Number(letTheCatOutOfTheBag('PORT'));
const mongo_uri: string = letTheCatOutOfTheBag('MONGO_URI');

app.get('/', (req: Request, res: Response) => {
    res.send(`<h1> Hello, server hahahhahahahah!! </h1>`);
    // res.json({message: 'Hello, World!!'});
});

// console.log(process.env.MONGO_URI);
app.listen(port, async () => {
    try{
        const connection = await connectDatabase(mongo_uri);
        logger.info(JSON.stringify({message: 'Server started on port'}));
        console.log('started');
    } catch (err) {
        logger.error(err);
        console.log(err);
        process.exit(1);
    };
});