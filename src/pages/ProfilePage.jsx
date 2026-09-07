import { useAuth } from "../contexts/AuthContext.jsx";

function ProfilePage() {
  const { email, isAuthenticated } = useAuth();

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {email}</p>
      <p>Status: {isAuthenticated ? "Logged in" : "Logged out"}</p>
    </div>
  );
}

export default ProfilePage;
