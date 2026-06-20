import Navbar from
"../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import "../styles/dashboard.css"

function Settings() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="dashboard-container">
        <Navbar />

        <div className="settings-container">
             <h1>Settings</h1>

      <div
        className="settings-card"
      >
        <h3>
          Profile Information
        </h3>

        <p>
          Name:
          {" "}
          {user.name}
        </p>

        <p>
          Email:
          {" "}
          {user.email}
        </p>
      </div>
        </div>
                <footer className="footer">
          © 2026 TaskFlow
        </footer>
      </div>

     
    </div>
  );
}

export default Settings;