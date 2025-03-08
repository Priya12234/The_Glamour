import { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation
} from "react-router-dom";
import Appointments from "./Appointments";
import Feedback from "./Feedback"; // ✅ Import Feedback Component
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";
import Orders from "./Orders"; // ✅ Import Orders Component
import Product from "./Product";
import RegisterForm from "./RegisterForm";
import Services from "./Services"; // ✅ Import Services Component
import Sidebar from "./Sidebar";
import Users from "./Users";
import User_Orders from "./User_Orders";
import UserAppointments from "./User_Appointments";

function AdminLayout() {
  const location = useLocation();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded((prevState) => !prevState);
  };

  // Define paths where Sidebar, Navbar, and Footer should not appear
  const hideComponentsPaths = ["/registerform"];

  // Check if the current path matches any paths in hideComponentsPaths array
  const shouldHideComponents = hideComponentsPaths.some(path =>
    location.pathname.startsWith(path)
  );

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
            <Route path="/orders" element={<Orders />} /> {/* ✅ Orders Route */}
            <Route path="/services" element={<Services />} /> {/* ✅ Services Route */}
            <Route path="/feedbacks" element={<Feedback />} />
             {/* ✅ Feedback Route Added */}
            <Route path="/userorders" element={<User_Orders />} />
            <Route path="/userappointments" element={<UserAppointments />} /> {/* ✅ User Appointments Route */}
          </Routes>
        </main>
        {/* Conditionally render Footer */}
        {!shouldHideComponents && <Footer />}
      </div>
    </div>
  );
}

function AdminApp() {
  return (
    <Router>
      <AdminLayout />
    </Router>
  );
}

export default AdminApp;
