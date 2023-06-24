const logError = (...props) => {
  console.error(...props);
};

const errorHandler = (error, _, response, next) => {
  logError(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'invalid id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }
  next(error);
};

export default errorHandler;
