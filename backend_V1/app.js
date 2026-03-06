const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const vehicleRentalRouter = require('./routes/vehicleRentalRouter');
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/vehicleRentals', vehicleRentalRouter);

// --- Static files ---
app.use(express.static('view'));       // Serve frontend assets

// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);

// --- SPA fallback (must be last) ---
app.use((req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});

module.exports = app;
