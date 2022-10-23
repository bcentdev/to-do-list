import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Task, TaskId } from 'api/models/task.model';
import taskService, { TASK_NOT_FOUND_ERROR, UNKNOWN_RECORD_ERROR } from 'api/services/taskService';
import CustomResponse from 'api/utils/CustomResponse';

const MISSING_TASK_ID_ERROR = 'Missing task id';

const sendError = (error: unknown, res: CustomResponse<Task>) => {
  if (error instanceof Error) {
    if (error.message === TASK_NOT_FOUND_ERROR) {
      res.status(StatusCodes.NOT_FOUND).send({ success: false, error: error.message });
      return;
    }

    if (error.message === UNKNOWN_RECORD_ERROR) {
      res.status(StatusCodes.BAD_REQUEST).send({ success: false, error: error.message });
      return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, error: error.message });
    return;
  }

  return error;
};

const getAllTasks = async (_req: Request, res: CustomResponse<Task[]>) => {
  try {
    const tasks = await taskService.getAllTasks();

    res.status(StatusCodes.OK).send({ success: true, data: tasks, message: 'Tasks found' });
  } catch (error) {
    error instanceof Error &&
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ success: false, error: error.message });
  }
};

const getOneTask = async (req: Request<{ taskId: TaskId }>, res: CustomResponse<Task>) => {
  const { taskId } = req.params;

  if (!taskId) {
    res.status(StatusCodes.BAD_REQUEST).send({ success: false, error: MISSING_TASK_ID_ERROR });
    return;
  }

  try {
    const task = await taskService.getOneTask(taskId);

    res.status(StatusCodes.OK).send({ success: true, data: task, message: `Task ${task.description} found` });
  } catch (error) {
    sendError(error, res);
  }
};

const createNewTask = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, Task>,
  res: CustomResponse<Task>,
) => {
  const { body } = req;

  if (!body.description) {
    res.status(StatusCodes.BAD_REQUEST).send({ success: false, error: 'Missing description' });
    return;
  }

  const newTask = {
    description: body.description,
  };

  try {
    const task = await taskService.createNewTask(newTask);

    res.status(StatusCodes.CREATED).send({ success: true, data: task, message: 'Task created' });
  } catch (error) {
    sendError(error, res);
  }
};

const updateOneTask = async (req: Request<{ taskId: TaskId }>, res: CustomResponse<Task>) => {
  const {
    body,
    params: { taskId },
  } = req;

  if (!taskId) {
    res.status(StatusCodes.BAD_REQUEST).send({ success: false, error: MISSING_TASK_ID_ERROR });
    return;
  }

  if (!body.description) {
    res.status(StatusCodes.BAD_REQUEST).send({ success: false, error: 'Missing description' });
    return;
  }

  const taskFields = {
    description: body.description,
  };

  try {
    const task = await taskService.updateOneTask(taskId, taskFields);

    res.status(StatusCodes.OK).send({ success: true, data: task, message: 'Task updated' });
  } catch (error) {
    sendError(error, res);
  }
};

const deleteOneTask = async (req: Request<{ taskId: TaskId }>, res: CustomResponse<Task>) => {
  const { taskId } = req.params;

  if (!taskId) {
    res.status(StatusCodes.BAD_REQUEST).send({ success: false, error: MISSING_TASK_ID_ERROR });
    return;
  }

  try {
    const task = await taskService.deleteOneTask(taskId);

    res.status(StatusCodes.OK).send({ success: true, data: task, message: 'Task deleted' });
  } catch (error) {
    sendError(error, res);
  }
};

const taskController = {
  getAllTasks,
  getOneTask,
  createNewTask,
  updateOneTask,
  deleteOneTask,
};

export default taskController;
