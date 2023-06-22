import mongoose from 'mongoose';

// Define schema & model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3 },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = mongoose.model('User', userSchema);
export default User;
