import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
        return "Dashboard";
      case "/transactions":
        return "Transactions";
      case "/reports":
        return "Reports";
      default:
        return "Finance Tracker";
    }
  };

  return (
    <header className="navbar">
      <h1>{getPageTitle()}</h1>
    </header>
  );
}

export default Navbar;
