const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  planId: {
    type: String,
    enum: ['starter', 'pro', 'elite'],
    required: true,
  },
  planName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  cardLast4: {
    type: String,
    required: true,
  },
  billingAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  promoCode: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'paused'],
    default: 'active',
  },
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
