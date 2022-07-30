import taskService from 'api/services/taskService';
import { Request, Response } from 'express';

const getAllTasks = (_req: Request, res: Response) => {
  const tasks = taskService.getAllTasks();

  res.send({ status: 'OK', data: tasks });
};

const taskController = {
  getAllTasks,
};

export default taskController;
