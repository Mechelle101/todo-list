import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Logoff() {
  const [error, setError] = useState("");

  const { logout } = useAuth();

  const handleLogoff = async () => {
    setError("");

    const result = await logout();
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <>
      <button type="button" onClick={handleLogoff}>
        Log Off
      </button>
      {error && <p>{error}</p>}
    </>
  );
}
