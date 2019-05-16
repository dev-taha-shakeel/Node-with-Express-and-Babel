import mongoose, { Schema } from 'mongoose';

const LeadersSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
      type: String,
      required: true
  },
  designation: {
    type: String,
    required: true
  },
  abbr: {
      type: String,
      required: true,
  },
  description: {
    type: String,
    required: true
  },
  featured: {
      type: Boolean,
      default:false      
  },
  }, {
  timestamps: true
});

export const leadersSchema = mongoose.model('promotions', LeadersSchema);