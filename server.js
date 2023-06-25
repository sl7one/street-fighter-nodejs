import { app } from './index.js';

const port = 3050;
app.listen(port, () => {
  console.log(port, 'Port is listening.');
});
