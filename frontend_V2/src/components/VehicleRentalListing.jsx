import { Link } from "react-router-dom";

const VehicleRentalListing = ({ vehicle }) => {
  return (
    <div className="rental-preview">
      <h2>{vehicle.vehicleModel}</h2>
      <p>Category: {vehicle.category}</p>
      <p>Daily Price: ${vehicle.dailyPrice.toFixed(2)}</p>
      <p>Status: {vehicle.availabilityStatus}</p>
      <Link to={`/vehicle-rentals/${vehicle.id}`}>
        <h2>View Details</h2>
      </Link>
    </div>
  );
};

export default VehicleRentalListing;
