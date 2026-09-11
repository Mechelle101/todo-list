import { useAuth } from "../contexts/AuthContext.jsx";
import Logoff from "../features/Logoff.jsx";
import Navigation from "./Navigation.jsx";

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <header className="header">
      <div className="header-inner">
        <h1>Todo List</h1>
        <Navigation />
        {isAuthenticated && <Logoff />}
      </div>
    </header>
  );
}
