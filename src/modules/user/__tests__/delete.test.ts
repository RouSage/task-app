import request from 'supertest';

import app from 'app';

import { USER_ONE } from '../testData';
import { User } from '../user.model';

describe('DELETE User endpoint', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await User.create(USER_ONE);
  });

  it('should delete account for user', async () => {
    const { tokens } = USER_ONE;

    await request(app)
      .delete('/users/me')
      .set('Authorization', `Bearer ${tokens[0].token}`)
      .send()
      .expect(200);
  });

  it('should not delete account for unauthenticated user', async () => {
    await request(app).delete('/users/me').send().expect(401);
  });
});
