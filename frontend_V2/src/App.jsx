import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddVehicleRentalPage from "./pages/AddVehicleRentalPage";
import EditVehicleRentalPage from "./pages/EditVehicleRentalPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VehicleRentalPage from "./pages/VehicleRentalPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token ? true : false;
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/rental/:id"
              element={<VehicleRentalPage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/add-rental"
              element={
                isAuthenticated ? <AddVehicleRentalPage /> : <></>
              }
            />
            <Route
              path="/edit-rental/:id"
              element={
                isAuthenticated ? (
                  <EditVehicleRentalPage />
                ) : (
                  <></>
                )
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <></>
                ) : (
                  <Signup setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <></>
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;