import express from 'express';

import { User } from '@modules/user/user.model';

import { generateAuthToken } from './auth.helper';
import { isAuthenticated } from './auth.middleware';
import { ILoginRequest, IAuthRequestBody, IAuthRequest } from './auth.types';

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

// Logout the user
router.post('/logout', isAuthenticated, async (req: IAuthRequest, res) => {
  const { user, token } = req;

  try {
    user?.set({ tokens: user?.tokens.filter((t) => t.token !== token) });
    await user?.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// Logout the user of all sessions
router.post('/logoutAll', isAuthenticated, async (req: IAuthRequest, res) => {
  const { user } = req;

  try {
    user?.set({ tokens: [] });
    await user?.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
