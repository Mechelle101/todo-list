import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page does not exist.</p>

      <ul>
        <li>
          <Link to="/todos">Go to Todos</Link>
        </li>
        <li>
          <Link to="/about">About this App</Link>
        </li>
        <li>
          <Link to="/login">Log in</Link>
        </li>
      </ul>
    </div>
  );
}

export default NotFoundPage;
