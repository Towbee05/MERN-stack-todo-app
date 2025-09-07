import mongoose from 'mongoose';

const connectDB = (uri: string):Promise<typeof mongoose> => {
    return mongoose.connect(uri);
};

export default connectDB;