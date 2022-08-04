import { isValidObjectId } from 'mongoose';

import { Task, TaskId, TaskModel } from 'api/models/task.model';

const UNKNOWN_RECORD_ERROR = 'Unknown Record';
const TASK_NOT_FOUND_ERROR = 'Task not found';

const getAllTasks = () => {
  try {
    return TaskModel.find();
  } catch (error) {
    console.log(`find error => ${error}`);
    return error as Error;
  }
};

const getOneTask = async (id: TaskId) => {
  if (!isValidObjectId(id)) {
    return new Error(UNKNOWN_RECORD_ERROR);
  }

  try {
    const task = await TaskModel.findById(id);

    if (!task) {
      return new Error(TASK_NOT_FOUND_ERROR);
    }

    return task;
  } catch (error) {
    console.log(`find one error => ${error}`);
    return error as Error;
  }
};

const createNewTask = (newTask: Task) => {
  try {
    return TaskModel.create(newTask);
  } catch (error) {
    console.log(`create error => ${error}`);
    return error as Error;
  }
};

const updateOneTask = async (id: TaskId, taskFields: Task) => {
  if (!isValidObjectId(id)) {
    return new Error(UNKNOWN_RECORD_ERROR);
  }

  try {
    const task = await TaskModel.findByIdAndUpdate(id, taskFields, { new: true });

    if (!task) {
      return new Error(TASK_NOT_FOUND_ERROR);
    }

    return task;
  } catch (error) {
    console.log(`find and update error => ${error}`);
    return error as Error;
  }
};

const deleteOneTask = async (id: TaskId) => {
  if (!isValidObjectId(id)) {
    return new Error(UNKNOWN_RECORD_ERROR);
  }

  try {
    const task = await TaskModel.findByIdAndDelete(id);

    if (!task) {
      return new Error(TASK_NOT_FOUND_ERROR);
    }

    return task;
  } catch (error) {
    console.log(`find and delete error => ${error}`);
    return error as Error;
  }
};

const taskService = {
  getAllTasks,
  getOneTask,
  createNewTask,
  updateOneTask,
  deleteOneTask,
};

export default taskService;
