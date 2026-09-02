import Header from "./shared/Header.jsx";
import TodosPage from "./features/Todos/TodosPage.jsx";
import Logon from "./features/Logon.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";
import "./App.css";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <Header />
      {isAuthenticated ? <TodosPage /> : <Logon />}
    </div>
  );
}

export default App;
