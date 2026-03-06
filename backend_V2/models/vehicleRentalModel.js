const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vehicleRentalSchema = new Schema({
  vehicleModel: { type: String, required: true }, // e.g., "Toyota Camry"
  category: { type: String, required: true }, // e.g., Economy, Luxury, SUV
  description: { type: String, required: true },
  agency: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    fleetSize: { type: Number }, // Total vehicles managed by agency
  },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  dailyPrice: { type: Number, required: true }, // Cost per day
  listingDate: { type: Date, default: Date.now }, 
  availabilityStatus: { 
    type: String, 
    enum: ['available', 'rented', 'maintenance'], 
    default: 'available' 
  }, 
  bookingDeadline: { type: Date }, // Date until which the offer is valid
  insurancePolicy: { type: String, required: true }, 
});

// add virtual field id
vehicleRentalSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});

module.exports = mongoose.model("Vehicle", vehicleRentalSchema);