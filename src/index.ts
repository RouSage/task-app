import express from 'express';

import { appConfig } from '@config';
import { UserModel } from '@modules/user/user.model';
import MongooseService from '@services/mongoose.service';

MongooseService.connectWithRetry();

const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
  UserModel.create(req.body)
    .then((u) => {
      res.send(u);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.listen(appConfig.port, () => {
  console.log(`Server is up on port ${appConfig.port}`);
});
