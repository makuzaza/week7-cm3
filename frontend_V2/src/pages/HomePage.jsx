import VehicleRentalListings from "../components/VehicleRentalListings";
import { useState, useEffect } from "react";

const Home = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicleRentals");
        if (!response.ok) throw new Error("Could not fetch vehicles");
        const data = await response.json();
        setVehicles(data);
        setIsPending(false);
      } catch (err) {
        setError(err.message);
        setIsPending(false);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p>Loading vehicles...</p>}
      {!isPending && !error && <VehicleRentalListings vehicles={vehicles} />}
    </div>
  );
};

export default Home;
