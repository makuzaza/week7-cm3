const Vehicle = require("../models/vehicleRentalModel");
const mongoose = require("mongoose");

// GET /api/vehicleRentals
const getAllVehicleRentals = async (req, res) => {
  try {
    const vehicleRentals = await Vehicle.find({}).sort({ createdAt: -1 });
    res.status(200).json(vehicleRentals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/vehicleRentals
const createVehicleRental = async (req, res) => {
  try {
    const user_id = req.user._id;
    const newVehicleRental = new Vehicle({
      ...req.body,
      user_id,
    });
    await newVehicleRental.save();
    res.status(201).json(newVehicleRental);
  } catch (error) {
    console.error("Error creating vehicle rental:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// GET /api/vehicleRentals/:vehicleRentalId
const getVehicleRentalById = async (req, res) => {
  try {
    const { vehicleRentalId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
      return res.status(400).json({ error: "Invalid vehicle rental ID" });
    }
    const vehicleRental = await Vehicle.findById(vehicleRentalId);
    if (!vehicleRental) {
      return res.status(404).json({ error: "Vehicle rental not found" });
    }
    res.status(200).json(vehicleRental);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicle rental" });
  }
};

// PUT /api/vehicleRentals/:vehicleRentalId
const updateVehicleRental = async (req, res) => {
  try {
    const { vehicleRentalId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
      return res.status(400).json({ error: "Invalid vehicle rental ID" });
    }
    const vehicleRental = await Vehicle.findOneAndUpdate(
      { _id: vehicleRentalId },
      { ...req.body },
      { new: true, returnDocument: "after" },
    );

    if (!vehicleRental) {
      return res.status(404).json({ error: "Vehicle rental not found" });
    }
    res.status(200).json(vehicleRental);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/vehicleRentals/:vehicleRentalId
const deleteVehicleRental = async (req, res) => {
  const { vehicleRentalId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(vehicleRentalId)) {
    return res.status(400).json({ error: "Invalid vehicle rental ID" });
  }
  try {
    const vehicleRental = await Vehicle.findOneAndDelete({ _id: vehicleRentalId });
    if (!vehicleRental) {
      return res.status(404).json({ error: "Vehicle rental not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllVehicleRentals,
  createVehicleRental,
  getVehicleRentalById,
  updateVehicleRental,
  deleteVehicleRental,
};
