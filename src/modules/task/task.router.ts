import express from 'express';

import { TaskModel } from './task.model';

const router = express.Router();

router.post('/', (req, res) => {
  TaskModel.create(req.body)
    .then((task) => {
      res.status(201).send(task);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

export default router;
