import Router from 'express';
import User from '../models/user.js';

const authRouter = Router();

authRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ userId: username });
  const isCorrectPassword = password === user?.password;

  if (!(user && isCorrectPassword)) {
    return response.status(401).json({ error: 'Invalid username or password' });
  }

  const { userId, isAdmin } = user;
  response.status(200).send({ userId, isAdmin });
});

export default authRouter;
