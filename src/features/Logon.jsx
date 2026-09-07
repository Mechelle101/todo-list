import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function Logon() {
  const { login } = useAuth();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [authError, setAuthError] = useState("");
  // const [isLoggingOn, setIsLoggingOn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoggingOn(true);
    // setAuthError("");

    const result = await login(email, password);
    if (!result.success) {
      setAuthError(result.error);
    }
    setIsLoggingOn(false);
  };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     {authError && <p className="error">{authError}</p>}

  //     <div>
  //       <label htmlFor="email">Email</label>
  //       <input
  //         id="email"
  //         type="email"
  //         required
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />
  //     </div>

  //     <div>
  //       <label htmlFor="password">Password</label>
  //       <input
  //         id="password"
  //         type="password"
  //         required
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //     </div>

  //     <button type="submit" disabled={isLoggingOn}>
  //       {isLoggingOn ? "Logging in..." : "Log On"}
  //     </button>
  //   </form>
  // );
}

export default Logon;
