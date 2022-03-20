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

router.get('/', (_, res) => {
  TaskModel.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  TaskModel.findById(id)
    .then((task) => {
      if (!task) {
        res.status(404).send();
        return;
      }

      res.send(task);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

export default router;
