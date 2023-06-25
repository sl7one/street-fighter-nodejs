import cors from 'cors';
import express from 'express';
import { initRoutes } from './routes/routes.js';

import './config/db.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.use('/', express.static('./client/build'));

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({
    error: true,
    message,
  });
});

const port = 3050;
app.listen(port, () => {
  console.log(port, 'Port is listening. OK');
});

export { app };
