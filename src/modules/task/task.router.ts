import express from 'express';

import { TaskModel } from './task.model';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const task = await TaskModel.create(req.body);
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (_, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).send();
      return;
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;

  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
    return;
  }

  try {
    const task = await TaskModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      res.status(404).send();
      return;
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = TaskModel.findByIdAndDelete(id);

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
