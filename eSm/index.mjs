import express from 'express';
import routes from './routes';

const app = express();

app.use('/api/v1', routes);
const PORT = 4001;
app.listen(PORT, () => console.log(`Server is listerning in port:${PORT}`));
