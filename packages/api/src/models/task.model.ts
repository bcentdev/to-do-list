import { Schema, model } from 'mongoose';

type Task = {
  id: string;
  description: string;
};

const taskSchema = new Schema<Task>({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Task = model<Task>('Task', taskSchema);

export default Task;
