import 'dotenv/config';

const letTheCatOutOfTheBag = (secret: string): string => {
    const secret_value = process.env[secret];
    if (!secret_value) {
        throw new Error('Unknown secret specified!!');
    }
    return secret_value;
};

export default letTheCatOutOfTheBag;