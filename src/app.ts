import express from 'express';
import { queryParser } from 'express-query-parser';

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

export default app;
