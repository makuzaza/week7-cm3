const VehicleRental = require('../models/vehicleRentalModel');
const mongoose = require('mongoose');

// GET /api/vehicleRentals
const getAllVehicleRentals = async (req, res) => {
  try {
    const vehicleRentals = await VehicleRental.find({}).sort({ createdAt: -1 });
    res.json(vehicleRentals);
  } catch (ex) {
    console.error("Failed to get all vehicle rentals: " + ex);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST /api/vehicleRentals
const createVehicleRental = async (req, res) => {
  try {
    const vehicleRentalData = req.body;
    await VehicleRental.validate(vehicleRentalData);

    const newRental = await VehicleRental.create(vehicleRentalData);
    res.status(201).json(newRental);
  } catch (ex) {
    console.error("Failed to create new vehicle rental: " + ex);
    if (ex.name === 'ValidationError') {
      res.status(400).json({ error: ex.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// GET /api/vehicleRentals/:vehicleRentalId
const getVehicleRentalById = async (req, res) => {
  try {
    const { vehicleRentalId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    const vehicleRental = await VehicleRental.findById(vehicleRentalId);

    if (!vehicleRental) {
      res.status(404).json({ error: "Vehicle rental not found" });
      return;
    }

    res.json(vehicleRental);
  } catch (ex) {
    console.error("Failed to get all vehicle rentals: " + ex);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PUT /api/vehicleRentals/:vehicleRentalId
const updateVehicleRental = async (req, res) => {
  try {
    const { vehicleRentalId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    const vehicleRentalData = req.body;
    await VehicleRental.validate(vehicleRentalData);

    const updatedRental = await VehicleRental.findByIdAndUpdate(vehicleRentalId, vehicleRentalData, { new: true });

    if (!updatedRental) {
      res.status(404).json({ error: "Vehicle rental not found" });
      return;
    }

    res.json(updatedRental);
  } catch (ex) {
    console.error("Failed to create new vehicle rental: " + ex);
    if (ex.name === 'ValidationError') {
      res.status(400).json({ error: ex.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

// DELETE /api/vehicleRentals/:vehicleRentalId
const deleteVehicleRental = async (req, res) => {
  try {
    const { vehicleRentalId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
      res.status(400).json({ error: "Invalid ID format" });
      return;
    }

    const vehicleRental = await VehicleRental.findByIdAndDelete(vehicleRentalId);

    if (!vehicleRental) {
      res.status(404).json({ error: "Vehicle rental not found" });
      return;
    }

    res.status(204).json();
  } catch (ex) {
    console.error("Failed to get all vehicle rentals: " + ex);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
};
