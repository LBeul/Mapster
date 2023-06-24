import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  street: { type: String, required: true },
  zipCode: { type: String, required: true },
  description: { type: String, required: false },
  score: { type: Number, required: false },
});

locationSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Location = mongoose.model('Location', locationSchema);
export default Location;
