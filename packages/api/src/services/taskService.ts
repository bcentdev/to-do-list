import Task from 'api/models/task.model';

const getAllTasks = async () => {
  try {
    return await Task.find().orFail(new Error('No tasks found'));
  } catch (error) {
    console.log(`find error => ${error}`);
    return error;
  }
};

/*const getOneTask = () => {
  return;
};

const createNewTask = (newTask) => {
  return;
};

const updateOneTask = () => {
  return;
};

const deleteOneTask = () => {
  return;
};*/

const taskService = {
  getAllTasks,
};

export default taskService;
