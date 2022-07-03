import request from 'supertest';

import { User } from '@modules/user/user.model';
import app from 'app';

import { Task } from '../task.model';
import {
  TASK_ONE,
  TASK_THREE,
  TASK_TWO,
  USER_ONE,
  USER_TWO,
} from '../testData';

describe('DELETE Task endpoint', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await User.create(USER_ONE);
    await User.create(USER_TWO);

    await Task.deleteMany();
    await Task.create(TASK_ONE);
    await Task.create(TASK_TWO);
    await Task.create(TASK_THREE);
  });

  it('should not delete other users tasks', async () => {
    const { tokens } = USER_TWO;
    const { _id } = TASK_ONE;

    await request(app)
      .delete(`/tasks/${_id.toString()}`)
      .set('Authorization', `Bearer ${tokens[0].token}`)
      .send()
      .expect(404);

    const task = await Task.findById(_id);
    expect(task).not.toBeNull();
  });
});
