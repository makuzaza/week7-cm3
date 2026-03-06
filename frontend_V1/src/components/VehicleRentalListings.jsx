import { useState, useEffect } from "react";
import VehicleRentalListing from "./VehicleRentalListing";

const VehicleRentalListings = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch("/api/vehicleRentals");
      const data = await response.json();
      setProperties(data);
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/vehicleRentals/${id}`, {
      method: "DELETE",
    });

    setProperties(properties.filter((p) => p._id !== id));
  };

  return (
    <div className="rental-list">
      {properties.map((property) => (
        <VehicleRentalListing
          key={property._id}
          property={property}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default VehicleRentalListings;

