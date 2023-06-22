import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import User from './models/user.js';

const app = express();

// Configure mongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to mongoDB'))
  .catch((e) => console.error('Error connecting to mongoDB:', e.message));

// Invoke middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

let locations = [
  {
    id: 1,
    title: 'Kernkraftwerk',
    lat: 52.52197645,
    lon: 13.413637435864272,
    street: 'Alexanderplatz',
    zipCode: '12488',
    description: 'lorem ipsum dolor sit amet',
    score: 5,
  },
  {
    id: 2,
    title: 'Heizkraftwerk',
    lat: 52.4685507,
    lon: 13.5543359,
    street: 'An der Wuhlheide',
    zipCode: '12488',
    description: 'lorem ipsum dolor sit amet',
    score: 10,
  },
  {
    id: 3,
    title: 'Braunkohlegrube',
    lat: 52.5166047,
    lon: 13.3809897,
    street: 'Unter den Linden',
    zipCode: '12488',
    description: 'lorem ipsum dolor sit amet',
    score: 7,
  },
];

app.get('/', (_, response) => {
  response.send('<h1>Ja moin.</h1>');
});

app.get('/api/locations', (_, response) => {
  response.json(locations);
});

app.post('/auth', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ userId: username });
  const isCorrectPassword = password === user?.password;

  if (!(user && isCorrectPassword)) {
    return response.status(401).json({ error: 'Invalid username or password' });
  }

  const { userId, isAdmin } = user;
  response.status(200).send({ userId, isAdmin });
});

export default app;
