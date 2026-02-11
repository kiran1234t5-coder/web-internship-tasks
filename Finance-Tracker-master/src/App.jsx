import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { FinanceProvider } from "./context/FinanceContext";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Reports from "./pages/Reports";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/pages.css";

function App() {
  return (
    <ThemeProvider>
      <FinanceProvider>
        <Router>
          <div className="app">
            <Sidebar />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/budgets" element={<Budgets />} />
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </main>
          </div>
        </Router>
      </FinanceProvider>
    </ThemeProvider>
  );
}

export default App;
