import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

app
  .get('/', (req: Request, res: Response) =>
    res.json({ message: 'Welcome to the GamerHouse API!' })
  )
  .listen(5000, () => {
    console.log('Running GamerHouse API on http://localhost:5000');
  });

export default app;
