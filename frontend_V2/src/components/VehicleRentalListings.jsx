import VehicleRentalListing from "./VehicleRentalListing";

const VehicleRentalListings = ({ vehicleRentals }) => {
  return (
    <div className="rental-list">
      {vehicleRentals.map((vehicleRental) => {
        <VehicleRentalListing key={vehicleRental.id} vehicleRental={vehicleRental} />
      })}
    </div>
  );
};

export default VehicleRentalListings;