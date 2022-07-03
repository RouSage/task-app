import request from 'supertest';

import { User } from '@modules/user/user.model';
import app from 'app';

import { Task } from '../task.model';
import { TASK_THREE, TASK_TWO, USER_TWO } from '../testData';

describe('GET Task endpoint', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await User.create(USER_TWO);

    await Task.deleteMany();
    await Task.create(TASK_TWO);
    await Task.create(TASK_THREE);
  });

  it('should create task for user', async () => {
    const { tokens } = USER_TWO;

    const { body } = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${tokens[0].token}`)
      .send()
      .expect(200);
    expect(body.length).toBe(2);
  });
});
