import request from 'supertest';

import { User } from '@modules/user/user.model';
import app from 'app';

import { USER_ONE } from '../testData';

describe('GET User profile endpoint', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await User.create(USER_ONE);
  });

  it('should get profile for the user', async () => {
    const { tokens } = USER_ONE;

    await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${tokens[0].token}`)
      .send()
      .expect(200);
  });

  it('should not get profile for unauthenticated user', async () => {
    await request(app).get('/users/me').send().expect(401);
  });
});
