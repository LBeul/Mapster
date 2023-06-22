import mongoose from 'mongoose';

// Define schema & model
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, minlength: 1 },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = mongoose.model('User', userSchema);
export default User;
