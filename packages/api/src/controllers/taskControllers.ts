import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Task, TaskId } from 'api/models/task.model';
import taskService from 'api/services/taskService';
import CustomResponse from 'api/utils/CustomResponse';

const getAllTasks = async (_req: Request, res: CustomResponse<Task[]>) => {
  const tasks = await taskService.getAllTasks();

  if (tasks instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, error: tasks.message });
    return;
  }

  res.status(StatusCodes.OK).send({ success: true, data: tasks, message: 'Tasks found' });
};

const getOneTask = async (req: Request<{ taskId: TaskId }>, res: CustomResponse<Task>) => {
  const task = await taskService.getOneTask(req.params.taskId);

  if (task instanceof Error) {
    if (task.message === 'Task not found') {
      res.status(StatusCodes.NOT_FOUND).send({ success: false, error: task.message });
      return;
    }

    if (task.message === 'Unknown Record') {
      res.status(StatusCodes.BAD_REQUEST).send({ success: false, error: task.message });
      return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, error: task.message });
    return;
  }

  res.status(StatusCodes.OK).send({ success: true, data: task, message: `Task ${task.description} found` });
};

const createNewTask = (req: Request<Record<string, unknown>, Record<string, unknown>, Task>, res: CustomResponse) => {
  const { body } = req;

  if (!body.description) {
    res.status(StatusCodes.BAD_REQUEST).send({ success: false, error: 'Missing description' });
    return;
  }

  const newTask = {
    description: body.description,
  };

  taskService.createNewTask(newTask);

  res.status(StatusCodes.CREATED).send({ success: true, message: 'Task created' });
};

const taskController = {
  getAllTasks,
  getOneTask,
  createNewTask,
};

export default taskController;
