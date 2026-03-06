import { Link } from "react-router-dom";

const VehicleRentalListing = ({ vehicleRental }) => {
  return (
    <div className="rental-preview">
      <Link to={`/rentals/${vehicleRental.id}`}>
        <h2>{vehicleRental.vehicleModel}</h2>
      </Link>
      <p>Category: {vehicleRental.category}</p>
      <p>Daily Price: ${vehicleRental.dailyPrice}</p>
      <p>Status: {vehicleRental.availabilityStatus}</p>
    </div>
  );
};

export default VehicleRentalListing;
