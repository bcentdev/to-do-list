import { Schema, model, ObjectId } from 'mongoose';

type TaskId = ObjectId;

type Task = {
  description: string;
};

const taskSchema = new Schema<Task>({
  description: {
    type: String,
    required: true,
  },
});

const TaskModel = model<Task>('Task', taskSchema);

export { TaskId, Task, TaskModel };
