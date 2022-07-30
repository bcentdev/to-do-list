import taskRoutes from 'api/v1/routes/taskRoutes';
import express, { Express, Request, Response } from 'express';

import '../database';

const app: Express = express();
const PORT = process.env.PORT || 3031;

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello world');
});

app.use('/api/v1/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
