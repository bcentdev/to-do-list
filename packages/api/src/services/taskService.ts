import { isValidObjectId, Error } from 'mongoose';

import { Task, TaskId, TaskModel } from 'api/models/task.model';

const UNKNOWN_RECORD_ERROR = 'Unknown Record';
const TASK_NOT_FOUND_ERROR = 'Task not found';

const getAllTasks = () => {
  try {
    return TaskModel.find();
  } catch (error) {
    console.error(`find error => ${error}`);
    throw error;
  }
};

const getOneTask = async (id: TaskId) => {
  if (!isValidObjectId(id)) {
    throw new Error(UNKNOWN_RECORD_ERROR);
  }

  try {
    const task = await TaskModel.findById(id);

    if (!task) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    return task;
  } catch (error) {
    console.log(`find one error => ${error}`);
    throw error;
  }
};

const createNewTask = (newTask: Task) => {
  try {
    return TaskModel.create(newTask);
  } catch (error) {
    console.log(`create error => ${error}`);
    throw error;
  }
};

const updateOneTask = async (id: TaskId, taskFields: Task) => {
  if (!isValidObjectId(id)) {
    throw new Error(UNKNOWN_RECORD_ERROR);
  }

  try {
    const task = await TaskModel.findByIdAndUpdate(id, taskFields, { new: true });

    if (!task) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    return task;
  } catch (error) {
    console.log(`find and update error => ${error}`);
    throw error;
  }
};

const deleteOneTask = async (id: TaskId) => {
  if (!isValidObjectId(id)) {
    throw new Error(UNKNOWN_RECORD_ERROR);
  }

  try {
    const task = await TaskModel.findByIdAndDelete(id);

    if (!task) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    return task;
  } catch (error) {
    console.log(`find and delete error => ${error}`);
    throw error;
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

export { UNKNOWN_RECORD_ERROR, TASK_NOT_FOUND_ERROR };
