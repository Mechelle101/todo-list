import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";

function Navigation() {
  const { isAuthenticated } = useAuth();

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </li>

        {isAuthenticated && (
          <>
            <li>
              <NavLink to="/todos" className="nav-link">
                Todos
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>
            </li>
          </>
        )}

        {!isAuthenticated && (
          <li>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
