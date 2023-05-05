import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.send('Hello world!');
});

app.use('/send-sms', routes.sendSms);

app.listen(port, () =>
  console.log(`App listening on port ${port}!`),
);
