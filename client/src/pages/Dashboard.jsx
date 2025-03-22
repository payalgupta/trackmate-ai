import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Welcome to TrackMate AI 👋</h1>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
