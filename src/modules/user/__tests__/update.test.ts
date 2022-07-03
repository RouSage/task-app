import request from 'supertest';

import app from 'app';

import { USER_ONE } from '../testData';
import { User } from '../user.model';

describe('UPDATE User endpoint', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await User.create(USER_ONE);
  });

  it('should update valid user fields', async () => {
    const { _id, tokens } = USER_ONE;

    const { body } = await request(app)
      .patch('/users/me')
      .set('Authorization', `Bearer ${tokens[0].token}`)
      .send({ name: 'Mike' })
      .expect(200);
    expect(body.name).toBe('Mike');

    const user = await User.findById(_id);
    expect(user?.name).toBe('Mike');
  });

  it('should not update invalid user fields', async () => {
    const { tokens } = USER_ONE;

    await request(app)
      .patch('/users/me')
      .set('Authorization', `Bearer ${tokens[0].token}`)
      .send({ location: 'New-York' })
      .expect(400);
  });
});
