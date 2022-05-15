import express from 'express';

import { User } from '@modules/user/user.model';

import { generateAuthToken } from './auth.helper';
import { ILoginRequest, IAuthRequestBody } from './auth.types';

const router = express.Router();

// Create (register) user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = generateAuthToken({ _id: user.id });

    user.set({ tokens: user.tokens.concat({ token }) });
    await user.save();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login the user
router.post('/login', async (req: IAuthRequestBody<ILoginRequest>, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = generateAuthToken({ _id: user.id });

    user.set({ tokens: user.tokens.concat({ token }) });
    await user.save();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

export default router;
