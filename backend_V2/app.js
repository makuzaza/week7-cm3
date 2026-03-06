const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db");
const vehicleRentalRouter = require('./routes/vehicleRentalRouter');
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');
const userRouter = require("./routes/userRouter");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/vehicleRentals', vehicleRentalRouter);
app.use('/api/auth', userRouter);

app.use(express.static('view'));  

// Error handling
app.use('/api', unknownEndpoint);
app.use(errorHandler);

// React fallback
app.use((req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});

module.exports = app;
