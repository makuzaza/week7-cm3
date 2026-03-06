import VehicleRentalListings from "../components/VehicleRentalListings";
import { useState, useEffect } from "react";

const Home = () => {
  const [vehicleRentals, setVehicleRentals] = useState([]);

  useEffect(() => {
    const fetchVehicleRentals = async () => {
      const apiUrl = "/api/vehicleRentals";
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Could not fetch vehicle rentals");
        } else {
          const data = await res.json();
          setVehicleRentals(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchVehicleRentals();
  }, []);

  return (
    <div className="home">
      <VehicleRentalListings vehicleRentals={vehicleRentals} />
    </div>
  );
};

export default Home;
