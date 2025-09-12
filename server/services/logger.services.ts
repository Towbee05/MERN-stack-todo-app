import winston, { Logger } from 'winston';

const logger: Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: './logs/error/error.log', level: 'error' }),
        new winston.transports.File({ filename: './logs/combinedlog.log' })
    ]
});

export default logger;