import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Task, TaskId } from 'api/models/task.model';
import taskService from 'api/services/taskService';
import CustomResponse from 'api/utils/CustomResponse';

const checkErrors = (task: Task | Error, res: CustomResponse<Task>) => {
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

  return task;
};

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

  const checkedTask = checkErrors(task, res);

  !!checkedTask &&
    res
      .status(StatusCodes.OK)
      .send({ success: true, data: checkedTask, message: `Task ${checkedTask.description} found` });
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

  const task = await taskService.createNewTask(newTask);

  const checkedTask = checkErrors(task, res);

  !!checkedTask && res.status(StatusCodes.CREATED).send({ success: true, data: checkedTask, message: 'Task created' });
};

const updateOneTask = async (req: Request<{ taskId: TaskId }>, res: CustomResponse<Task>) => {
  const {
    body,
    params: { taskId },
  } = req;

  if (!body.description) {
    res.status(StatusCodes.BAD_REQUEST).send({ success: false, error: 'Missing description' });
    return;
  }

  const taskFields = {
    description: body.description,
  };

  const task = await taskService.updateOneTask(taskId, taskFields);

  const checkedTask = checkErrors(task, res);

  !!checkedTask && res.status(StatusCodes.OK).send({ success: true, data: checkedTask, message: 'Task updated' });
};

const deleteOneTask = async (req: Request<{ taskId: TaskId }>, res: CustomResponse<Task>) => {
  const { taskId } = req.params;

  const task = await taskService.deleteOneTask(taskId);

  const checkedTask = checkErrors(task, res);

  !!checkedTask && res.status(StatusCodes.OK).send({ success: true, data: checkedTask, message: 'Task deleted' });
};

const taskController = {
  getAllTasks,
  getOneTask,
  createNewTask,
  updateOneTask,
  deleteOneTask,
};

export default taskController;
