import { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation
} from "react-router-dom";
import Appointments from "./Appointments";
import Feedback from "./Feedback"; 
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";
import Orders from "./Orders"; 
import Product from "./Product";
import RegisterForm from "./RegisterForm";
import Services from "./Services"; 
import Sidebar from "./Sidebar";
import Users from "./Users";
import UserOrders from "./UserOrders";
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
            <Route path="/orders" element={<Orders />} /> 
            <Route path="/services" element={<Services />} /> 
            <Route path="/feedbacks" element={<Feedback />} /> 
            <Route path="/userorders/:userName/:userEmail/:userNumber" element={<UserOrders />} />
            <Route path="/userappointments/:userName/:userEmail/:userNumber" element={<UserAppointments />} />
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
