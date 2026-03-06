const VehicleRentalListing = ({ property }) => {
  return (
    <div className="rental-preview">
      <h2>{property.vehicleModel}</h2>
      <p>Category: {property.category}</p>
      <p>Daily Price: ${property.dailyPrice}</p>
      <p>Status: {property.availabilityStatus}</p>
    </div>
  );
};

export default VehicleRentalListing;
