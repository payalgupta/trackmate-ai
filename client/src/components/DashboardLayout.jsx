import { useNavigate, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="drawer drawer-mobile min-h-screen">
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-100 shadow px-4">
          <div className="flex-1 text-xl font-bold">TrackMate AI</div>
          <div className="flex-none">
            <button className="btn btn-sm btn-error" onClick={logout}>Logout</button>
          </div>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-base-200 text-base-content">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/upload">Upload Receipt</a></li>
          <li>
            <select
              className="select select-bordered"
              onChange={(e) =>
                document.documentElement.setAttribute("data-theme", e.target.value)
              }
              >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="corporate">Corporate</option>
              <option value="pastel">Pastel</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
}
