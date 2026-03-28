const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedEvents = require('./seeders/seed');

dotenv.config();

const app = express();

// Connect to MongoDB then seed
connectDB().then(() => seedEvents());

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/community', require('./routes/community'));
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/newsletter', require('./routes/newsletter'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Raceline API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
