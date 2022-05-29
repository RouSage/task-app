import express from 'express';
import { queryParser } from 'express-query-parser';

import { appConfig } from '@config';
import MongooseService from '@services/mongoose.service';
import { registerRestEndpoints } from 'restEndpoints';

MongooseService.connectWithRetry();

const app = express();
app.use(
  queryParser({
    parseBoolean: true,
    parseNull: true,
    parseNumber: true,
    parseUndefined: true,
  })
);
app.use(express.json());

registerRestEndpoints(app);

app.listen(appConfig.port, () => {
  console.log(`Server is up on port ${appConfig.port}`);
});
