import { useState, useEffect } from "react";
import VehicleRentalListing from "./VehicleRentalListing";

const VehicleRentalListings = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fechProperties = async () => {
      const prpproperties = await fetch("/api/vehicleRentals");
      const data = await prpproperties.json();
      setProperties(data);
    };
    fechProperties();
  }, []);

  return (
    <div className="rental-list">
      {properties.map((property) => (
        <VehicleRentalListing key={property.id} property={property} />
      ))}
    </div>
  );
};

export default VehicleRentalListings;
