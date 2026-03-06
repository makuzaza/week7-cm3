import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditVehicleRentalPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicleModel, setVehicleModel] = useState("");
  const [category, setCategory] = useState("Economy");
  const [description, setDescription] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [agencyEmail, setAgencyEmail] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("available");
  const [bookingDeadline, setBookingDeadline] = useState("");
  const [listingDate, setListingDate] = useState("");
  const [insurancePolicy, setInsurancePolicy] = useState("");

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
        setVehicleModel(data.vehicleModel);
        setCategory(data.category);
        setDescription(data.description);
        setDailyPrice(data.dailyPrice.toString());
        setAgencyName(data.agency.name);
        setAgencyEmail(data.agency.contactEmail);
        setFleetSize(
          data.agency.fleetSize ? data.agency.fleetSize.toString() : "",
        );
        setCity(data.location.city);
        setState(data.location.state);
        setAvailabilityStatus(data.availabilityStatus);
        setBookingDeadline(
          data.bookingDeadline
            ? new Date(data.bookingDeadline).toISOString().slice(0, 16)
            : "",
        );
        setInsurancePolicy(data.insurancePolicy);
        setListingDate(
          data.listingDate
            ? new Date(data.listingDate).toISOString().slice(0, 16)
            : "",
        );
      } catch (error) {
        console.error("Error fetching vehicle rental", error);
      }
    };
    fetchVehicleRental();
  }, [id, token]);

  const updateVehicleRental = async (updatedVehicleRental) => {
    try {
      const res = await fetch(`/api/vehicleRentals/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedVehicleRental),
      });
      if (!res.ok) throw new Error("Failed to update vehicle rental");
    } catch (error) {
      console.error("Error updating vehicle rental", error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const updatedVehicleRental = {
      vehicleModel,
      category,
      description,
      dailyPrice: parseFloat(dailyPrice),
      agency: {
        name: agencyName,
        contactEmail: agencyEmail,
        fleetSize: fleetSize ? parseInt(fleetSize) : undefined,
      },
      location: {
        city,
        state,
      },
      listingDate: listingDate ? new Date(listingDate) : new Date(),
      availabilityStatus,
      bookingDeadline: bookingDeadline ? new Date(bookingDeadline) : null,
      insurancePolicy,
    };
    try {
      await updateVehicleRental(updatedVehicleRental);
      navigate("/");
    } catch (error) {
      console.error("Error updating vehicle rental", error);
    }
  };

  return (
    <div className="create">
      <h2>Update Vehicle Rental</h2>
      <form onSubmit={submitForm}>
        <label>Vehicle Model:</label>
        <input
          type="text"
          value={vehicleModel}
          onChange={(e) => setVehicleModel(e.target.value)}
          required
        />
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Economy">Economy</option>
          <option value="Luxury">Luxury</option>
          <option value="SUV">SUV</option>
          <option value="Van">Van</option>
          <option value="Truck">Truck</option>
        </select>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <label>Agency Name:</label>
        <input
          type="text"
          value={agencyName}
          onChange={(e) => setAgencyName(e.target.value)}
          required
        />
        <label>Agency Email:</label>
        <input
          type="email"
          value={agencyEmail}
          onChange={(e) => setAgencyEmail(e.target.value)}
          required
        />
        <label>Fleet Size:</label>
        <input
          type="number"
          value={fleetSize}
          onChange={(e) => setFleetSize(e.target.value)}
          min="0"
        />
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <label>State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
        <label>Daily Price:</label>
        <input
          type="number"
          value={dailyPrice}
          onChange={(e) => setDailyPrice(e.target.value)}
          step="0.01"
          min="0"
          required
        />
        <label>Listing Date:</label>
        <input
          type="datetime-local"
          value={listingDate}
          onChange={(e) => setListingDate(e.target.value)}
          required
        />
        <label>Availability Status:</label>
        <select
          value={availabilityStatus}
          onChange={(e) => setAvailabilityStatus(e.target.value)}
        >
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <label>Booking Deadline:</label>
        <input
          type="datetime-local"
          value={bookingDeadline}
          onChange={(e) => setBookingDeadline(e.target.value)}
        />
        <label>Insurance Policy:</label>
        <input
          type="text"
          value={insurancePolicy}
          onChange={(e) => setInsurancePolicy(e.target.value)}
          required
        />
        <button>Update Vehicle Rental</button>
      </form>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
};

export default EditVehicleRentalPage;
