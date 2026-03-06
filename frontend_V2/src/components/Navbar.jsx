const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleClick = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar">
      <h1>Vehicle Rental</h1>
      <div className="links">
        <a href="/">Home</a>
        {isAuthenticated && (
          <div>
            <a href="/add-rental">Add Rental</a>
            <span>{JSON.parse(localStorage.getItem("user")).email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
