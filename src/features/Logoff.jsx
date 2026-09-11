import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Logoff() {
  const [error, setError] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoff = async () => {
    setError("");

    const result = await logout();
    if (result.success) {
      navigate("/login");
    } else {
      setError(result.error);
    }
  };

  return (
    <>
      <button type="button" onClick={handleLogoff} className="button-secondary">
        Log Off
      </button>
      {error && <p className="error">{error}</p>}
    </>
  );
}
