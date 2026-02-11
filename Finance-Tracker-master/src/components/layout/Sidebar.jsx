import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function Sidebar() {
  const { theme, setTheme } = useTheme();
  
  return (
    <aside className="sidebar">
      <h2>Finance Tracker</h2>
      <nav>
        <NavLink to="/" className="nav-link">Dashboard</NavLink>
        <NavLink to="/transactions" className="nav-link">Transactions</NavLink>
        <NavLink to="/budgets" className="nav-link">Budgets</NavLink>
        <NavLink to="/reports" className="nav-link">Reports</NavLink>
      </nav>
      <button
        className="btn"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        Toggle Theme
      </button>
    </aside>
  );
}

export default Sidebar;
