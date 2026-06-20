import {useNavigate} from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
    const navigate = useNavigate();
    const {theme, toggleTheme,} = useTheme();
      const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");

    };
    return (
    <nav className="navbar">
    <div className="navbar-right">
        <span>
        Welcome, {user.name}
        </span>

        <button
        onClick={toggleTheme}
        >
        {theme === "light"
            ? "🌙"
            : "☀️"}
        </button>

        <button
        onClick={handleLogout}
        >
        Logout
        </button>
    </div>
    </nav>
    )
}

export default Navbar;