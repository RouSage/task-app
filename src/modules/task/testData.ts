import mongoose from 'mongoose';

import { generateAuthToken } from '@modules/auth/auth.helper';

export const USER_ONE_ID = new mongoose.Types.ObjectId();
export const USER_ONE = {
  _id: USER_ONE_ID,
  name: 'John',
  email: 'john@test.com',
  password: 'TestUser7*',
  tokens: [
    {
      token: generateAuthToken({ _id: USER_ONE_ID.toString() }),
    },
  ],
};
export const USER_TWO_ID = new mongoose.Types.ObjectId();
export const USER_TWO = {
  _id: USER_TWO_ID,
  name: 'Mike',
  email: 'mike@test.com',
  password: 'TestUser8*',
  tokens: [{ token: generateAuthToken({ _id: USER_TWO_ID.toString() }) }],
};

export const TASK_ONE = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Test Task 1',
  completed: false,
  owner: USER_ONE_ID,
};
export const TASK_TWO = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Test Task 2',
  completed: false,
  owner: USER_TWO_ID,
};
export const TASK_THREE = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Test Task 3',
  completed: true,
  owner: USER_TWO_ID,
};
