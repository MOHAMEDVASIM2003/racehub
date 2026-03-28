const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    enum: ['CIRCUIT', 'DRIFT', 'ENDURANCE', 'RALLY', 'GT', 'DRAG', 'KART'],
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    required: true,
  },
  registrationOpen: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
