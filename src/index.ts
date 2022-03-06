import { MongoClient } from 'mongodb';

import { mongoConfig } from '@config';

MongoClient.connect(mongoConfig.url, (error, client) => {
  if (error) {
    return console.error(error);
  }

  const db = client?.db();
  db?.collection('users').insertOne({ name: 'RouSage', age: 24 });
  return console.log('Connected correctly');
});
