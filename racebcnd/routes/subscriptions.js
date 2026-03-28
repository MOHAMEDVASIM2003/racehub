const express = require('express');
const { body, validationResult } = require('express-validator');
const Subscription = require('../models/Subscription');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

const plansData = {
  starter: { name: 'Starter', price: '9.99' },
  pro: { name: 'Pro Racer', price: '19.99' },
  elite: { name: 'Elite', price: '39.99' },
};

// GET /api/subscriptions/plans - list available plans
router.get('/plans', (req, res) => {
  const plans = Object.entries(plansData).map(([id, plan]) => ({
    id,
    ...plan,
  }));
  res.json(plans);
});

// POST /api/subscriptions - create a subscription
router.post(
  '/',
  optionalAuth,
  [
    body('planId').isIn(['starter', 'pro', 'elite']).withMessage('Valid plan is required'),
    body('fullName').trim().notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('cardNumber').trim().notEmpty().withMessage('Card number is required'),
    body('expiry').trim().notEmpty().withMessage('Expiry date is required'),
    body('cvv').trim().notEmpty().withMessage('CVV is required'),
    body('billingAddress').trim().notEmpty().withMessage('Billing address is required'),
    body('city').trim().notEmpty().withMessage('City is required'),
    body('zip').trim().notEmpty().withMessage('ZIP code is required'),
    body('country').trim().notEmpty().withMessage('Country is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }

      const plan = plansData[req.body.planId];
      if (!plan) {
        return res.status(400).json({ message: 'Invalid plan' });
      }

      // Store only last 4 digits of card
      const cardLast4 = req.body.cardNumber.replace(/\s/g, '').slice(-4);

      const subscription = await Subscription.create({
        user: req.user ? req.user._id : undefined,
        planId: req.body.planId,
        planName: plan.name,
        price: plan.price,
        fullName: req.body.fullName,
        email: req.body.email,
        cardLast4,
        billingAddress: req.body.billingAddress,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        promoCode: req.body.promoCode || '',
      });

      res.status(201).json({
        message: `Welcome to Raceline ${plan.name}!`,
        subscription: {
          id: subscription._id,
          planName: subscription.planName,
          price: subscription.price,
          status: subscription.status,
        },
      });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
