import { useParams, useEffect, useState } from "react";

const VehicleRentalPage = () => {

  const { id } = useParams();
  const [rental, setRental] = useState(null);

  useEffect(() => {

    const fetchRental = async () => {

      const response = await fetch(`/api/vehicleRentals/${id}`);
      const data = await response.json();

      setRental(data);
    };

    fetchRental();

  }, [id]);

  if (!rental) return <p>Loading...</p>;

  return (

    <div className="rental-preview">

      <h2>{rental.vehicleModel}</h2>

      <p>Category: {rental.category}</p>
      <p>Daily Price: ${rental.dailyPrice}</p>
      <p>Status: {rental.availabilityStatus}</p>

    </div>

  );

};

export default VehicleRentalPage;
