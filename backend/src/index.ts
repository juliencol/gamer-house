import { connectDatabase } from "./database/connectDatabase";
import { createServer } from "./server";

/** Start backend server **/
connectDatabase().then(() => {
  const app = createServer();
  app.listen(5000, () => {
    console.log("Running GamerHouse API on http://localhost:5000");
  });
});
