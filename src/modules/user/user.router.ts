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

export default router;
