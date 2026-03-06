import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">

      <h1>
        <Link to="/">Vehicle Rental</Link>
      </h1>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add-rental">Add Vehicle</Link>
      </div>

    </nav>
  );
};

export default Navbar;
