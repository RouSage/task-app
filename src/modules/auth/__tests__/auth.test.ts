import request from 'supertest';

import { User } from '@modules/user/user.model';

import app from '../../../app';

const USER_ONE = {
  name: 'Mike',
  email: 'test2@test.com',
  password: 'TestUser7*',
};

beforeEach(async () => {
  await User.deleteMany();
  await User.create(USER_ONE);
});

test('should sign up a new user', async () => {
  await request(app)
    .post('/auth')
    .send({
      name: 'John',
      email: 'test1@test.com',
      password: 'TestUser7*',
    })
    .expect(201);
});

test('should login existing user', async () => {
  const { email, password } = USER_ONE;

  await request(app).post('/auth/login').send({ email, password }).expect(200);
});

test('should not login non-existing user', async () => {
  const { email } = USER_ONE;

  await request(app)
    .post('/auth/login')
    .send({ email, password: 'MyUser7*' })
    .expect(400);
});
