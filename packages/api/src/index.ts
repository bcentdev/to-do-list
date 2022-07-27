import express, { Express, Request, Response } from 'express';
import '../database';

const app: Express = express();
const port = process.env.PORT || 3031;

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
