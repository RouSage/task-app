import express from 'express';

import { UserModel } from './user.model';

const router = express.Router();

router.post('/', (req, res) => {
  UserModel.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get('/', (_, res) => {
  UserModel.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  UserModel.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send();
        return;
      }

      res.send(user);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

export default router;
