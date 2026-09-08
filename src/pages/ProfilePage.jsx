import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function ProfilePage() {
  const { email, token, isAuthenticated } = useAuth();
  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return;
      try {
        setLoading(true);
        setError("");

        const options = {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        };
        // default page limit is 10, request all todos for accurate stats
        const response = await fetch("/api/tasks?limit=100", options);

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        // API returns { tasks, pagination }, not a bare array
        const data = await response.json();
        const todos = Array.isArray(data.tasks) ? data.tasks : [];

        // calculate stats
        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;
        const active = total - completed; //subtracting, either one or the other

        setTodoStats({ total, completed, active });
      } catch (err) {
        setError(`Error loading stats: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetchTodoStats();
  }, [token]);

  const completionPercentage =
    todoStats.total > 0
      ? Math.round((todoStats.completed / todoStats.total) * 100)
      : 0;

  return (
    <div>
      <h2>Profile</h2>
      <section>
        <h3>Account</h3>
        <p>Name: {email}</p>
        <p>Status: {isAuthenticated ? "Logged in" : "Logged out"}</p>
      </section>
      <section>
        <h3>Todo Statistics</h3>
        {loading && <p>Loading Statistics...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <>
            <p>Total todos: {todoStats.total}</p>
            <p>Completed: {todoStats.completed}</p>
            <p>Active: {todoStats.active}</p>
            {todoStats.total > 0 && <p>Completion: {completionPercentage}%</p>}
          </>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
