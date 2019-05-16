import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const User = new Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  admin: {
      type: Boolean,
      default: false
  }
});

User.plugin(passportLocalMongoose);

export const usersSchema = mongoose.model('users', User);