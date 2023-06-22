import mongoose from 'mongoose';

// Define schema & model
const locationSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true, minlength: 3 },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  street: { type: String, required: true },
  zipCode: { type: String, required: true },
  description: { type: String, required: true },
  score: 5,
});

locationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Location = mongoose.model('Location', locationSchema);
export default Location;
