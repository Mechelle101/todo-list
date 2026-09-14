import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";

function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // getting the intended destination from location state, default /todos
  const from = location.state?.from?.pathname || "/todos";

  // redirecting if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const validateFields = () => {
    const errors = {};

    if (email.trim().length === 0) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (password.length === 0) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  // handle login form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setAuthError("");

    const errors = validateFields();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsLoggingOn(true);

    const result = await login(email.trim(), password);
    if (!result.success) {
      setAuthError(result.error);
    }
    setIsLoggingOn(false);
  }
  return (
    <form onSubmit={handleSubmit} className="card stack">
      {authError && (
        <p className="error" role="alert">
          {authError}
        </p>
      )}

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {fieldErrors.email && (
          <p className="field-error">{fieldErrors.email}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {fieldErrors.password && (
          <p className="field-error">{fieldErrors.password}</p>
        )}
      </div>

      <button type="submit" disabled={isLoggingOn}>
        {isLoggingOn ? "Logging in..." : "Log On"}
      </button>
    </form>
  );
}

export default LoginPage;
