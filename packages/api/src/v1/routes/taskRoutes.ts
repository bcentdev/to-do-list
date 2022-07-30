import taskController from 'api/controllers/taskControllers';
import { Router } from 'express';

const taskRoutes = Router();

taskRoutes.get('/', taskController.getAllTasks);
/*.get('/:taskId', taskController.getOneTask)
  .post('/', taskController.createNewTask)
  .patch('/:taskId', taskController.updateOneTask)
  .delete('/:taskId', taskController.deleteOneTask);*/

export default taskRoutes;
