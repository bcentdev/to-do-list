import { Task } from 'api/models/task.model';
import taskService from 'api/services/taskService';

describe('TaskService', () => {
  it('createNewTask', async () => {
    const newTask = {
      description: 'test',
    };

    const task = await taskService.createNewTask(newTask);

    expect((task as Task).description).toBe('test');
  });
});
