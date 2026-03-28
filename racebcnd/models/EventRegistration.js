const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
  eventId: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    default: '',
  },
  vehicleType: {
    type: String,
    enum: ['car', 'bike', 'kart'],
    required: true,
  },
  vehicleMake: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'professional'],
    required: true,
  },
  emergencyName: {
    type: String,
    required: true,
  },
  emergencyPhone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('EventRegistration', eventRegistrationSchema);
