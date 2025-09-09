import { Request, Response } from 'express';
import Tasks from '../models/Tasks';
import { ApiRespone } from './auth';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import Users from '../models/Users';
import { StatusCodes } from 'http-status-codes';
/* 
__________________________________________________________
!The following are to be implemented:
__________________________________________________________

?1. Create a new Task
?2. Get all task
?3. Get a single task
?4. Edit an existing task
?5. Delete a task
___________________________________________________________
*/

type Task = {
    id?: string,
    name: string,
    completed: boolean,
    user: string,
    timestamp? : Date
};

// Logic to create task
const createTask = async (req: Request<{}, {}, Task>, res: Response<ApiRespone>): Promise<void> => {
    try{
        const { name, completed } = req.body;
        const { user } = req.user;
        console.log(user);
        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).json({success: false, message: 'UNATHENTICATED', error: 'Please Login!!'});
        };
        if (!name) {
            res.status(StatusCodes.BAD_REQUEST).json({success: false, message: 'BAD REQUEST', error: 'Please provide a name!!'});
        };
        const { userId } = user;
        console.log(userId);
        const task = await Tasks.create({name, completed, user: userId});
        const userdb = await Users.findByIdAndUpdate( userId, { $push: { tasks: task._id } }, { new: true }).populate('tasks')
        res.status(StatusCodes.CREATED).json({ success: true, message: 'Created a new task', data: userdb });
    } catch (err){ 
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'INTERNAL_SERVER_ERROR', error: 'Failed to create task' });
    }
};

// Logic to get all task
const getAllTasks = async (req: Request<{}, {}, Task>, res: Response<ApiRespone>): Promise<void> => {
    try{
        const {user} = req.user;
        if (!user) {res.status(StatusCodes.UNAUTHORIZED).json({ success: false, message: 'UNAUTHENTICATED', error: 'Please login!!'})};
    
        const { userId } = user;
        console.log(userId);
        const tasks = await Users.findOne({_id: userId}).populate('tasks');
        res.status(StatusCodes.OK).json({ success: true, message: 'OK', data: tasks?.tasks});
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'INTERNAL_SERVER_ERROR', error: 'Failed to get task'});
    };
};

// Logic to get a single task
const getSingleTask = async (req: Request<{id: string}, {}, Task>, res: Response<ApiRespone>): Promise<void> => {
    try{
        const { user } = req.user;
        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).json({success: false, message: 'UNATHENTICATED', error: 'Please Login!!'});
        };
        
        const { userId } = user;
        const { id } = req.params; 
        const task = await Tasks.findOne({_id: id, user: userId});

        if (!task) {
            res.status(StatusCodes.NOT_FOUND).json({ success: false, message: 'NOT_FOUND', error: `Task with id: ${id} not found`});
        } 
        res.status(StatusCodes.OK).json({ success: true, message: 'OK', data: task});
        
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'INTERNAL_SERVER_ERROR', error: 'Failed to get task'});
    };
};

// Logic to edit a single task
const editTask = async (req: Request<{id: string}, {}, Task>, res: Response<ApiRespone>): Promise<void> => {
    try{
        const { user } = req.user;
        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).json({success: false, message: 'UNATHENTICATED', error: 'Please Login!!'});
        };
        
        const { userId } = user;
        const { id } = req.params; 
        const task = await Tasks.findOneAndUpdate(
            {
                _id: id, user: userId
            }, 
            req.body, 
            {
                new: true, runValidators: true
            }
        );
        if (!task) { res.status(StatusCodes.NOT_FOUND).json({success: false, message: 'NOT_FOUND', error: `Task with id: ${id} not found`}) };
        res.status(StatusCodes.OK).json({ success: true, message: 'OK', data: task});
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'INTERNAL_SERVER_ERROR', error: 'Failed to edit task'});
    };
};

// Logic to delete a single task
const deleteTask = async (req: Request<{id: string}, {}, Task>, res: Response<ApiRespone>): Promise<void> => {
    try{
        const { user } = req.user;
        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED).json({success: false, message: 'UNATHENTICATED', error: 'Please Login!!'});
        };
        
        const { userId } = user;
        const { id } = req.params;
        const task = await Tasks.findOneAndDelete({_id: id, user: userId});
        if (!task) { res.status(StatusCodes.NOT_FOUND).json({success: false, message: 'NOT_FOUND', error: `Task with id: ${id} not found`}); return; };
        await Users.findOneAndUpdate(
            {_id: userId}, 
            { $pull: { tasks: id }},
            { new: true }
        );
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: 'INTERNAL_SERVER_ERROR', error: 'Failed to delete task'});
    };
};

export type { Task };

export { 
    createTask, 
    getAllTasks,
    getSingleTask,
    editTask,
    deleteTask
};
