import { DEFAULT_APP_URL, DEFAULT_ENVIRONMENT, DEFAULT_PORT } from '../constants';
import { connectDatabase } from '../database/connectDatabase';
import { createServer } from './createServer';

/** Opens database connection then runs the server **/
export const startServer = async (): Promise<void> => {
  const database = await connectDatabase();
  await createServer().then((app) =>
    app.listen(DEFAULT_PORT, () =>
      console.debug('startServer', {
        server: {
          port: DEFAULT_PORT,
          url: DEFAULT_APP_URL,
          environment: DEFAULT_ENVIRONMENT,
        },
        database: {
          name: database.name,
          port: database.port,
        },
      })
    )
  );
};
