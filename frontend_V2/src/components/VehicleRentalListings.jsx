import { useState, useEffect } from "react";
import VehicleRentalListing from "./VehicleRentalListing";

const VehicleRentalListings = () => {
  const [vehicleRentals, setVehicleRentals] = useState([]);

  useEffect(() => {
    const fetchVehicleRentals = async () => {
      const response = await fetch("/api/vehicleRentals");
      const data = await response.json();
      setVehicleRentals(data);
    };

    fetchVehicleRentals();
  }, []);

  console.log(vehicleRentals);

  return (
    <div className="rental-list">
      {vehicleRentals.map((vehicleRental) => (
        <VehicleRentalListing key={vehicleRental.id} vehicleRental={vehicleRental} />
      ))}
    </div>
  );
};

export default VehicleRentalListings;