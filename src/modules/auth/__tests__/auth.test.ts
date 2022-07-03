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
  const { body } = await request(app)
    .post('/auth')
    .send({
      name: 'John',
      email: 'test1@test.com',
      password: 'TestUser7*',
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(body).toMatchObject({
    user: {
      name: 'John',
      email: 'test1@test.com',
    },
    token: user?.tokens[0].token,
  });
  expect(user?.password).not.toBe('TestUser7*');
});

test('should login existing user', async () => {
  const { email, password } = USER_ONE;

  const { body } = await request(app)
    .post('/auth/login')
    .send({ email, password })
    .expect(200);

  const user = await User.findById(body.user._id);
  expect(body.token).toBe(user?.tokens[0].token);
});

test('should not login non-existing user', async () => {
  const { email } = USER_ONE;

  await request(app)
    .post('/auth/login')
    .send({ email, password: 'MyUser7*' })
    .expect(400);
});
