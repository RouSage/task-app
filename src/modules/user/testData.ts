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
