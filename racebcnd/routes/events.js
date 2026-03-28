const express = require('express');
const { body, validationResult } = require('express-validator');
const Event = require('../models/Event');
const EventRegistration = require('../models/EventRegistration');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/events - list all events
router.get('/', async (req, res) => {
  try {
    const { tag, featured } = req.query;
    const filter = {};
    if (tag) filter.tag = tag.toUpperCase();
    if (featured === 'true') filter.featured = true;

    const events = await Event.find(filter).sort({ eventId: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/events/:eventId - get single event
router.get('/:eventId', async (req, res) => {
  try {
    const event = await Event.findOne({ eventId: req.params.eventId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/events/:eventId/register - register for an event
router.post(
  '/:eventId/register',
  optionalAuth,
  [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('dob').trim().notEmpty().withMessage('Date of birth is required'),
    body('vehicleType').isIn(['car', 'bike', 'kart']).withMessage('Valid vehicle type is required'),
    body('vehicleMake').trim().notEmpty().withMessage('Vehicle make is required'),
    body('vehicleModel').trim().notEmpty().withMessage('Vehicle model is required'),
    body('experience').isIn(['beginner', 'intermediate', 'advanced', 'professional']).withMessage('Valid experience level is required'),
    body('emergencyName').trim().notEmpty().withMessage('Emergency contact name is required'),
    body('emergencyPhone').trim().notEmpty().withMessage('Emergency contact phone is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }

      const eventId = parseInt(req.params.eventId);

      // Check for duplicate registration
      const existing = await EventRegistration.findOne({
        eventId,
        email: req.body.email,
      });
      if (existing) {
        return res.status(400).json({ message: 'Already registered for this event with this email' });
      }

      const registration = await EventRegistration.create({
        eventId,
        user: req.user ? req.user._id : undefined,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        dob: req.body.dob,
        licenseNumber: req.body.licenseNumber || '',
        vehicleType: req.body.vehicleType,
        vehicleMake: req.body.vehicleMake,
        vehicleModel: req.body.vehicleModel,
        experience: req.body.experience,
        emergencyName: req.body.emergencyName,
        emergencyPhone: req.body.emergencyPhone,
      });

      res.status(201).json({ message: 'Registration successful', registration });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
