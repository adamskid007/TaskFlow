import { Link } from "react-router-dom";

function Sidebar () {
return (
    <aside className="sidebar">
        <h2>TaskFlow</h2>
        <nav>
            <ul>
                <li>
                    <Link to="/dashboard"> 📊 Dashboard</Link>
                </li>
                <li>
                    <Link to="/tasks">  📝 Tasks</Link>
                </li>
                <li>
                    <Link to="/settings"> ⚙️ Settings</Link>
                </li>
            </ul>
        </nav>
    </aside>
)
}

export default Sidebar;