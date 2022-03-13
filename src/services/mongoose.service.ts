import mongoose from 'mongoose';

import { mongoConfig } from '@config';

export default class MongooseService {
  public static connectWithRetry = async () => {
    try {
      await mongoose.connect(mongoConfig.url);
    } catch (err: any) {
      console.error(
        err,
        'Failed to connect to mongo on startup - retrying in 5 seconds\n'
      );
      setTimeout(MongooseService.connectWithRetry, 5000);
    }
  };
}
