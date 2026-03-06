import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import AddVehicleRentalPage from "./pages/AddVehicleRentalPage";
import EditVehicleRentalPage from "./pages/EditVehicleRentalPage";
import VehicleRentalPage from "./pages/VehicleRentalPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {

  return (

    <Router>

      <Navbar />

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/add-rental" element={<AddVehicleRentalPage />} />

        <Route path="/edit-rental/:id" element={<EditVehicleRentalPage />} />

        <Route path="/vehicle-rental/:id" element={<VehicleRentalPage />} />

        <Route path="*" element={<NotFoundPage />} />

      </Routes>

    </Router>

  );

}

export default App;
