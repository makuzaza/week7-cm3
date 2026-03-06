import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddVehicleRentalPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState({
    model: "",
    category: "Economy",
    description: "",
    agencyName: "",
    agencyEmail: "",
    fleetSize: "",
    city: "",
    state: "",
    dailyPrice: "",
    availabilityStatus: "available",
    insurancePolicy: ""
  });

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

    try {
      const response = await fetch("/api/vehicleRentals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(properties)
      });

      if (!response.ok) {
        throw new Error("Failed to add vehicle rental");
      }

      console.log("Vehicle rental added successfully");

      navigate("/");

    } catch (error) {
      console.error("Error adding vehicle rental:", error);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Vehicle Rental</h2>

      <form onSubmit={submitForm}>

        <label>Vehicle Model:</label>
        <input
          type="text"
          required
          value={title.model}
          onChange={(e) => setTitle({ ...title, model: e.target.value })}
        />

        <label>Category:</label>
        <select
          value={title.category}
          onChange={(e) => setTitle({ ...title, category: e.target.value })}
        >
          <option value="Economy">Economy</option>
          <option value="Luxury">Luxury</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
          <option value="Truck">Truck</option>
        </select>

        <label>Description:</label>
        <textarea
          required
          value={title.description}
          onChange={(e) => setTitle({ ...title, description: e.target.value })}
        ></textarea>

        <label>Agency Name:</label>
        <input
          type="text"
          required
          value={title.agencyName}
          onChange={(e) => setTitle({ ...title, agencyName: e.target.value })}
        />

        <label>Agency Email:</label>
        <input
          type="email"
          required
          value={title.agencyEmail}
          onChange={(e) => setTitle({ ...title, agencyEmail: e.target.value })}
        />

        <label>Fleet Size:</label>
        <input
          type="number"
          min="0"
          value={title.fleetSize}
          onChange={(e) => setTitle({ ...title, fleetSize: parseInt(e.target.value) })}
        />

        <label>City:</label>
        <input
          type="text"
          required
          value={title.city}
          onChange={(e) => setTitle({ ...title, city: e.target.value })}
        />

        <label>State:</label>
        <input
          type="text"
          required
          value={title.state}
          onChange={(e) => setTitle({ ...title, state: e.target.value })}
        />

        <label>Daily Price:</label>
        <input
          type="number"
          step="0.01"
          min="0"
          required
          value={title.dailyPrice}
          onChange={(e) =>
            setTitle({ ...title, dailyPrice: parseFloat(e.target.value) })
          }
        />

        <label>Availability Status:</label>
        <select
          value={title.availabilityStatus}
          onChange={(e) =>
            setTitle({ ...title, availabilityStatus: e.target.value })
          }
        >
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <label>Insurance Policy:</label>
        <input
          type="text"
          required
          value={title.insurancePolicy}
          onChange={(e) =>
            setTitle({ ...title, insurancePolicy: e.target.value })
          }
        />

        <button>Add Vehicle Rental</button>

      </form>
    </div>
  );
};

export default AddVehicleRentalPage;