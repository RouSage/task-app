import express from 'express';

import { isAuthenticated } from '@modules/auth/auth.middleware';
import { IAuthRequest } from '@modules/auth/auth.types';

import { User } from './user.model';

const router = express.Router();

// Get the user's own info (profile)
router.get('/me', isAuthenticated, async (req: IAuthRequest, res) => {
  res.send(req.user);
});

// Update by ID
router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
    return;
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).send();
      return;
    }

    updates.forEach((update) => user.set(update, req.body[update]));
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
