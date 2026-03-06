const VehicleRentalListing = ({ vehicleRental }) => {
  return (
    <div className="rental-preview">
      <h2>{vehicleRental.model}</h2>
      <p>Category: {vehicleRental.category}</p>
      <p>Daily Price: ${vehicleRental.price}</p>
      <p>Status: {vehicleRental.status}</p>
    </div>
  );
};

export default VehicleRentalListing;
