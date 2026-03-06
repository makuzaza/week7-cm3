import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VehicleRentalPage = ({ isAuthenticated }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const navigate = useNavigate();
  const { id } = useParams();
  const [rental, setRental] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const res = await fetch(`/api/vehicleRentals/${id}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setRental(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRental();
  }, [id]);

  const deleteRental = async (rentalId) => {
    try {
      const res = await fetch(`/api/vehicleRentals/${rentalId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to delete product");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const onDeleteClick = (rentalId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;
    deleteRental(rentalId);
    navigate("/");
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}
      {
        rental && <div className="rental-preview">

          <h2>{rental.vehicleModel}</h2>

          <p>Category: {rental.category}</p>
          <p>Daily Price: ${rental.dailyPrice}</p>
          <p>Status: {rental.availabilityStatus}</p>
          <button onClick={() => onDeleteClick(rental.id)}>Delete</button>
          <button onClick={() => navigate(`/edit-rental/${rental.id}`)}>Edit</button>
        </div>
      }
    </div>
  );

};

export default VehicleRentalPage;