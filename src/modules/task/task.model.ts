import { model, Schema, Types } from 'mongoose';

export const VALID_UPDATES = ['description', 'completed'];

export interface ITask {
  description: string;
  completed?: boolean;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    description: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Task = model<ITask>('Task', taskSchema);
