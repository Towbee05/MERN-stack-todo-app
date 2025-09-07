import mongoose, { SchemaType } from "mongoose";

interface TaskInterface extends mongoose.Document{
    name: string,
    completed: boolean, 
    user: string
};

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Specify a name"],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskUser'
    }
},
{
    timestamps: true
});

export default mongoose.model<TaskInterface>('Task', TaskSchema);