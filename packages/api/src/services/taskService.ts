import { isValidObjectId } from 'mongoose';

import { Task, TaskId, TaskModel } from 'api/models/task.model';

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
    return new Error('Unknown Record');
  }

  try {
    const task = await TaskModel.findById(id);

    if (!task) {
      return new Error('Task not found');
    }

    return task;
  } catch (error) {
    console.log(`find one error => ${error}`);
    return error as Error;
  }
};

const createNewTask = (newTask: Task) => {
  try {
    return TaskModel.create(newTask).catch((error) => {
      console.log(`create error => ${error}`);
      return error;
    });
  } catch (error) {
    console.log(`create error => ${error}`);
    return error;
  }
};

/*const updateOneTask = () => {
  return;
};

const deleteOneTask = () => {
  return;
};*/

const taskService = {
  getAllTasks,
  getOneTask,
  createNewTask,
};

export default taskService;
