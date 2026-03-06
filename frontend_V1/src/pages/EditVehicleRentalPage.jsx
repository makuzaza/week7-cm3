import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditVehicleRentalPage = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState({
    model: "",
    category: "",
    description: "",
    agencyName: "",
    agencyEmail: "",
    fleetSize: "",
    city: "",
    state: "",
    dailyPrice: "",
    availabilityStatus: "",
    insurancePolicy: ""
  });

  useEffect(() => {

    const fetchRental = async () => {

      const response = await fetch(`/api/vehicleRentals/${id}`);
      const data = await response.json();

      setTitle({
        model: data.vehicleModel,
        category: data.category,
        description: data.description,
        agencyName: data.agency.name,
        agencyEmail: data.agency.contactEmail,
        fleetSize: data.agency.fleetSize,
        city: data.location.city,
        state: data.location.state,
        dailyPrice: data.dailyPrice,
        availabilityStatus: data.availabilityStatus,
        insurancePolicy: data.insurancePolicy
      });

    };

    fetchRental();

  }, [id]);

  const submitForm = async (e) => {

    e.preventDefault();

    const properties = {
      vehicleModel: title.model,
      category: title.category,
      description: title.description,

      agency: {
        name: title.agencyName,
        contactEmail: title.agencyEmail,
        fleetSize: title.fleetSize
      },

      location: {
        city: title.city,
        state: title.state
      },

      dailyPrice: title.dailyPrice,
      availabilityStatus: title.availabilityStatus,
      insurancePolicy: title.insurancePolicy
    };

    await fetch(`/api/vehicleRentals/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(properties)
    });

    navigate("/");

  };

  return (

    <div className="create">

      <h2>Edit Vehicle Rental</h2>

      <form onSubmit={submitForm}>

        <label>Vehicle Model:</label>
        <input
          type="text"
          required
          value={title.model}
          onChange={(e) => setTitle({ ...title, model: e.target.value })}
        />

        <label>Category:</label>
        <input
          type="text"
          value={title.category}
          onChange={(e) => setTitle({ ...title, category: e.target.value })}
        />

        <label>Description:</label>
        <textarea
          value={title.description}
          onChange={(e) => setTitle({ ...title, description: e.target.value })}
        />

        <label>Daily Price:</label>
        <input
          type="number"
          value={title.dailyPrice}
          onChange={(e) => setTitle({ ...title, dailyPrice: e.target.value })}
        />

        <button>Update Vehicle Rental</button>

      </form>

    </div>

  );

};

export default EditVehicleRentalPage;