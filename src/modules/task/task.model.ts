import { model, Schema, Types } from 'mongoose';

import { USER_MODEL_NAME } from '@modules/user/user.model';

export const TASK_MODEL_NAME = 'Task';

export interface ITask {
  description: string;
  completed?: boolean;
  owner: Types.ObjectId;
  createdAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    description: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
      required: true,
    },
  },
  { timestamps: true }
);

export const Task = model<ITask>(TASK_MODEL_NAME, taskSchema);
