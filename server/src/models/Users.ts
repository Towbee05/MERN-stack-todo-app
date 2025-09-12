import mongoose from "mongoose";
import customErrorAPI from "../errors/custom-error";
import { Task } from "../types/express";

interface UserInterface extends mongoose.Document{
    username: string,
    email: string,
    password: string,
    tasks?: Task[]
};

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: [ true, 'Please provide a username' ],
            trim: true,
            maxLength: [ 20, "Length of username should not be more than 20" ],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Pleae provide an email'],
            unique: true, 
            maxLength: [60, 'Email should not be more than 60'],
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email Format not supported!'],
            lowercase: true

        },
        password: {
            type: String,
            required: [ true, "Please provide a password" ],
            // maxLength: [ 20, "Password should not be more than 20 characters" ],
            minLength: [6, "Password should not be less than 6 characters"]
        },
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }]
    },
    {
        timestamps: true
    }
);

UserSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('email')) {
        const existingEmail = await mongoose.models.User?.findOne({
            email: user.email,
            _id: { $ne: user._id } 
        }); 
        if (existingEmail){
            const error = customErrorAPI('Email provided exist in database', 400);
            return next(error);
        };
    };

    if (user.isModified('username')){
        const existingUsername = await mongoose.models.User?.findOne({
            username: user.username,
            _id: { $ne: user._id }
        });
        if (existingUsername) {
            const error = customErrorAPI('A user already exist with this username', 400);
            return next(error)
        };
    };
    next();
});

export default mongoose.model<UserInterface>('TaskUser', UserSchema);