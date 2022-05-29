import express from 'express';

import { isAuthenticated } from '@modules/auth/auth.middleware';
import { IAuthRequest } from '@modules/auth/auth.types';
import { checkIfIncludes } from '@utils';

import { VALID_UPDATES } from './user.model';

const router = express.Router();

// Get the user's own info (profile)
router.get('/me', isAuthenticated, async (req: IAuthRequest, res) => {
  res.send(req.user);
});

// Update User
router.patch('/me', isAuthenticated, async (req: IAuthRequest, res) => {
  const { user, body } = req;

  const updates = Object.keys(body);
  const isValidOperation = checkIfIncludes(VALID_UPDATES, updates);

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
    return;
  }

  try {
    updates.forEach((update) => user?.set(update, req.body[update]));
    await user?.save();

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete User
router.delete('/me', isAuthenticated, async (req: IAuthRequest, res) => {
  const { user } = req;

  try {
    await user?.remove();

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
