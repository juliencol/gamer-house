import { connectDatabase } from "./database/connectDatabase";
import { createServer } from "./server";

/** Start backend server **/
const startBackendServer = async () => {
  await connectDatabase()
    .then(async () => await createServer())
    .then((app) =>
      app.listen(5000, () =>
        console.log("Running GamerHouse API on http://localhost:5000")
      )
    );
};

startBackendServer();
