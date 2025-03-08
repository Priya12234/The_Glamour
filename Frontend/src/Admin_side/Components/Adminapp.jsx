import { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation
} from "react-router-dom";
import Appointments from "./Appointments";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";
import Product from "./Product";
import RegisterForm from "./RegisterForm";
import Sidebar from "./Sidebar";
import Users from "./Users";

function AdminLayout() {
  const location = useLocation();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded((prevState) => !prevState);
  };

  // Define an array of paths where Sidebar, Navbar, and Footer should not appear
  const hideComponentsPaths = [
    "/registerform", // Add more paths if needed
  ];

  // Check if the current path matches any of the paths in the hideComponentsPaths array
  const shouldHideComponents = hideComponentsPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className={`wrapper ${isSidebarExpanded ? "sidebar-expanded" : ""}`}>
      {/* Conditionally render Sidebar */}
      {!shouldHideComponents && (
        <Sidebar
          isSidebarExpanded={isSidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
      )}
      <div className="main">
        {/* Conditionally render Navbar */}
        {!shouldHideComponents && <Navbar />}
        <main className="content px-3 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/users" element={<Users />} />
            <Route path="/registerform" element={<RegisterForm />} />
            <Route path="/product" element={<Product />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        {/* Conditionally render Footer */}
        {!shouldHideComponents && <Footer />}
      </div>
    </div>
  );
}


function AdminApp (){
  return (
    <Router>
      <AdminLayout />
    </Router>
  );
}

export default AdminApp;