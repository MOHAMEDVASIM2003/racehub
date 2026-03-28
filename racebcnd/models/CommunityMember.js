const mongoose = require('mongoose');

const communityMemberSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    enum: ['car', 'bike', 'kart', 'both'],
    required: true,
  },
  vehicleName: {
    type: String,
    default: '',
  },
  experience: {
    type: String,
    enum: ['newcomer', 'amateur', 'intermediate', 'pro'],
    required: true,
  },
  racingStyle: {
    type: String,
    enum: ['circuit', 'drag', 'drift', 'rally', 'street', ''],
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  instagram: {
    type: String,
    default: '',
  },
  badge: {
    type: String,
    default: '',
  },
  raceWins: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('CommunityMember', communityMemberSchema);
