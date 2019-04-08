import mongoose, { Schema } from 'mongoose';

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    required: false,
    default: false
  },
  creation_date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export const todoSchema = mongoose.model('items', TodoSchema);