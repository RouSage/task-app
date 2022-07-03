import request from 'supertest';

import { User } from '@modules/user/user.model';
import app from 'app';

import { Task } from '../task.model';
import { USER_TWO } from '../testData';

describe('CREATE Task endpoint', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await User.create(USER_TWO);
  });

  it('should create task for user', async () => {
    const { tokens } = USER_TWO;

    const { body } = await request(app)
      .post('/tasks/')
      .set('Authorization', `Bearer ${tokens[0].token}`)
      .send({ description: 'Test Task' })
      .expect(201);

    const task = await Task.findById(body._id);
    expect(task).not.toBeNull();
    expect(task?.completed).toBe(false);
  });
});
