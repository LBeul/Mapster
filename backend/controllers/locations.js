import Router from 'express';
import Location from '../models/location.js';

const locationsRouter = Router();

// GET all locations
locationsRouter.get('/', (_, response) => {
  Location.find({}).then((locations) => response.json(locations));
});

// GET location by id
locationsRouter.get('/:id', async (request, response) => {
  const note = await Location.findById(request.params.id);
  if (note) {
    response.json(note.toJSON());
  } else {
    response.status(404).end();
  }
});

// POST new location
locationsRouter.post('/', async (request, response) => {
  const { title, lat, lon, street, zipCode, description, score } = request.body;

  const location = new Location({
    title,
    lat,
    lon,
    street,
    zipCode,
    description,
    score,
  });
  const savedLocation = await location.save();
  response.status(201).json(savedLocation);
});

// DELETE location by id
locationsRouter.delete('/:id', (request, response, next) => {
  Location.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

// UPDATE user by id
locationsRouter.put('/:id', (request, response, next) => {
  const { title, lat, lon, street, zipCode, description, score } = request.body;
  const location = { title, lat, lon, street, zipCode, description, score };

  Location.findByIdAndUpdate(request.params.id, location, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedLocation) => response.json(updatedLocation))
    .catch((error) => next(error));
});

export default locationsRouter;
