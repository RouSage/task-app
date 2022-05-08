import express from 'express';

import { UserModel } from './user.model';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (_, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    if (!user) {
      res.status(404).send();
      return;
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

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
    const user = await UserModel.findById(id);

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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
