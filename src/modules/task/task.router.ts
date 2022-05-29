import express from 'express';

import { isAuthenticated } from '@modules/auth/auth.middleware';
import { IAuthRequest } from '@modules/auth/auth.types';
import { checkIfIncludes, isNil } from '@utils';

import { ITask, Task, VALID_UPDATES } from './task.model';

const router = express.Router();

// Create task
router.post('/', isAuthenticated, async (req: IAuthRequest, res) => {
  const task = new Task<ITask>({
    ...req.body,
    owner: req.user?._id,
  });

  try {
    await task.save();

    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all tasks
// GET /tasks?completed=(true|false)
// GET /tasks?limit=(number)&skip=(number)
// GET /tasks?sortBy=createdAt_desc
router.get('/', isAuthenticated, async (req: IAuthRequest, res) => {
  const { user } = req;
  const { completed, limit, skip, sortBy } = req.query;

  const match: Record<string, any> = {};
  const sort: Record<string, any> = {};

  if (!isNil(completed)) {
    match.completed = completed;
  }
  if (!isNil(sortBy)) {
    const [field, order] = String(sortBy).split('_');
    sort[field] = order;
  }

  try {
    const tasks = await Task.find({ owner: user?._id, ...match })
      .skip(Number(skip))
      .limit(Number(limit))
      .sort(sort);

    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get task by ID
router.get('/:id', isAuthenticated, async (req: IAuthRequest, res) => {
  const { user } = req;
  const { id } = req.params;

  try {
    const task = await Task.findOne({ _id: id, owner: user?._id });

    if (!task) {
      res.status(404).send();
      return;
    }

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update task
router.patch('/:id', isAuthenticated, async (req: IAuthRequest, res) => {
  const { user } = req;
  const { id } = req.params;

  const updates = Object.keys(req.body);
  const isValidOperation = checkIfIncludes(VALID_UPDATES, updates);

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
    return;
  }

  try {
    const task = await Task.findOne({ _id: id, owner: user?._id });

    if (!task) {
      res.status(404).send();
      return;
    }

    updates.forEach((update) => task.set(update, req.body[update]));
    await task.save();

    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete task
router.delete('/:id', isAuthenticated, async (req: IAuthRequest, res) => {
  const { user } = req;
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, owner: user?._id });

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
