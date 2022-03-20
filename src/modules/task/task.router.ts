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

export default router;
