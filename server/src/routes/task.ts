import express, { Request, Response, Router } from 'express';
import { createTask, getAllTasks, getSingleTask, editTask, deleteTask } from '../controllers/tasks';
import authenticateUser from '../middleware/authenticate';

const router: Router = express.Router();
router.route('/').post(authenticateUser, createTask).get(authenticateUser, getAllTasks);
router.route('/:id').get(authenticateUser, getSingleTask).patch(authenticateUser, editTask).delete(authenticateUser, deleteTask);

export default router; 