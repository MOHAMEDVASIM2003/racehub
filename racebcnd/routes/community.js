const express = require('express');
const { body, validationResult } = require('express-validator');
const CommunityMember = require('../models/CommunityMember');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/community/members - list community members
router.get('/members', async (req, res) => {
  try {
    const members = await CommunityMember.find()
      .sort({ raceWins: -1 })
      .limit(50);
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/community/join - join the community
router.post(
  '/join',
  optionalAuth,
  [
    body('displayName').trim().notEmpty().withMessage('Display name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('city').trim().notEmpty().withMessage('City is required'),
    body('country').trim().notEmpty().withMessage('Country is required'),
    body('vehicleType').isIn(['car', 'bike', 'kart', 'both']).withMessage('Valid vehicle type is required'),
    body('experience').isIn(['newcomer', 'amateur', 'intermediate', 'pro']).withMessage('Valid experience level is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }

      const existingMember = await CommunityMember.findOne({ email: req.body.email });
      if (existingMember) {
        return res.status(400).json({ message: 'Already a community member with this email' });
      }

      const member = await CommunityMember.create({
        user: req.user ? req.user._id : undefined,
        displayName: req.body.displayName,
        email: req.body.email,
        phone: req.body.phone || '',
        city: req.body.city,
        country: req.body.country,
        vehicleType: req.body.vehicleType,
        vehicleName: req.body.vehicleName || '',
        experience: req.body.experience,
        racingStyle: req.body.racingStyle || '',
        bio: req.body.bio || '',
        instagram: req.body.instagram || '',
      });

      res.status(201).json({ message: 'Welcome to the community!', member });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
