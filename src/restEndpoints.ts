import { Application } from 'express';

import taskRouter from '@modules/task/task.router';
import userRouter from '@modules/user/user.router';

export const registerRestEndpoints = (app: Application) => {
  app.use('/tasks', taskRouter);
  app.use('/users', userRouter);
};
