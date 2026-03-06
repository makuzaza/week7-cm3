import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VehicleRentalPage = ({ isAuthenticated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  useEffect(() => {
    const fetchVehicleRental = async () => {
      try {
        const res = await fetch(`/api/vehicleRentals/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch vehicle rental");
        const data = await res.json();
        setVehicle(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicleRental();
  }, [id, navigate]);

  const deleteProduct = async () => {
    try {
      const request = await fetch(`/api/vehicleRentals/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!request.ok) throw new Error("failed to delete vehicle rental");
    } catch (error) {
      console.error("Error deleting vehicle rental", error);
    }
  };
  const onDeleteClick = async () => {
    const confirm = window.confirm(
      "Do you want to delete this vehicle rental?",
    );
    if (!confirm) return;
    await deleteProduct();
    navigate("/");
  };

  return (
    <div className="rental-preview">
      <h3>Vehicle Details</h3>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {vehicle && (
        <div>
          <h2>{vehicle.vehicleModel}</h2>
          <p>Category: {vehicle.category}</p>
          <p>Daily Price: ${vehicle.dailyPrice.toFixed(2)}</p>
          <p>Status: {vehicle.availabilityStatus}</p>
        </div>
      )}
      <button onClick={() => navigate("/")}>Back</button>
      {isAuthenticated && (
        <>
          <button onClick={() => navigate(`/edit-rental/${vehicle._id}`)}>
            Edit
          </button>
          <button onClick={() => onDeleteClick(vehicle._id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default VehicleRentalPage;
