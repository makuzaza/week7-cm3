import { useNavigate } from "react-router-dom";

const VehicleRentalListing = ({ property }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-rental/${property._id}`);
  };

  const handleDelete = async () => {

    await fetch(`/api/vehicleRentals/${property._id}`, {
      method: "DELETE",
    });

    window.location.reload();

  };

  return (
    <div className="rental-preview">
      <h2>{property.vehicleModel}</h2>

      <p>Category: {property.category}</p>
      <p>Daily Price: ${property.dailyPrice}</p>
      <p>Status: {property.availabilityStatus}</p>

      <div className="buttons">
        <button onClick={handleEdit}>Edit</button>

        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default VehicleRentalListing;
