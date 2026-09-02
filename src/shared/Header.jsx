import { useAuth } from "../contexts/AuthContext.jsx";
import Logoff from "../features/Logoff.jsx";

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <header>
      <h1>Todo List</h1>
      {isAuthenticated && <Logoff />}
    </header>
  );
}
