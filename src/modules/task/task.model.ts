import { model, Schema } from 'mongoose';

interface Task {
  description: string;
  completed?: boolean;
  createdAt: Date;
}

const taskSchema = new Schema<Task>(
  {
    description: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const TaskModel = model<Task>('Task', taskSchema);
