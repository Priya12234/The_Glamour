import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Client_side/Components/Landing_page";
import AdminApp from "./Admin_side/Components/Adminapp";

function App() {
  return (
    <Router>
      <Routes>
        {/* Client-side routes */}
        <Route path="/*" element={<LandingPage />} />

        {/* Admin-side routes */}
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </Router>
  );
}

export default App;