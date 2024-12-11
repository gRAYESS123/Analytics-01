const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Import routes
const authRoutes = require('./api/routes/auth');
const ticketRoutes = require('./api/routes/tickets');
const analyticsRoutes = require('./api/routes/analytics');
const metricsRoutes = require('./api/routes/metrics');

// Import middleware
const authMiddleware = require('./api/middleware/auth');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', authMiddleware, ticketRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutes);
app.use('/api/metrics', authMiddleware, metricsRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});