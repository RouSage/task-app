import request from 'supertest';

import app from 'app';

import { USER_ONE } from '../testData';
import { User } from '../user.model';

describe('UPLOAD User avatar', () => {
  beforeEach(async () => {
    await User.deleteMany();
    await User.create(USER_ONE);
  });

  it('should upload avatar image', async () => {
    const { _id, tokens } = USER_ONE;

    await request(app)
      .post('/users/me/avatar')
      .set('Authorization', `Bearer ${tokens[0].token}`)
      .attach('avatar', 'src/modules/user/__tests__/fixtures/profile-pic.jpg')
      .expect(200);

    const user = await User.findById(_id);
    expect(user?.avatar).toEqual(expect.any(Buffer));
  });
});
