import { appConfig } from '@config';
import app from 'app';

app.listen(appConfig.port, () => {
  console.log(`Server is up on port ${appConfig.port}`);
});
