import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found">

      <h2>Page Not Found</h2>

      <p>This page does not exist.</p>

      <Link to="/">
        Go back to Home
      </Link>

    </div>
  );
};

export default NotFoundPage;
