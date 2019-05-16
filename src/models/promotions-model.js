import mongoose, { Schema } from 'mongoose';
// require('mongoose-currency').loadType(mongoose);
// const Currency = mongoose.Types.Currency;

const PromotionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
      type: String,
      required: true
  },
  label: {
      type: String,
      default: ''
  },
  price: {
      type: String,
      required: true,
      min: 0
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

export const promotionSchema = mongoose.model('promotion', PromotionSchema);