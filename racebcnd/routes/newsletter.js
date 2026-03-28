const express = require('express');
const { body, validationResult } = require('express-validator');
const Newsletter = require('../models/Newsletter');

const router = express.Router();

// POST /api/newsletter/subscribe
router.post(
  '/subscribe',
  [
    body('email').isEmail().withMessage('Valid email is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }

      const existing = await Newsletter.findOne({ email: req.body.email });
      if (existing) {
        return res.status(400).json({ message: 'Already subscribed' });
      }

      await Newsletter.create({ email: req.body.email });
      res.status(201).json({ message: 'Subscribed to newsletter!' });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
