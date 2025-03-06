import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Appointments from "./Appointments";
import Users from "./Users";
import RegisterForm from "./RegisterForm";

function AdminLayout() {
  const location = useLocation();

  // Define an array of paths where Sidebar, Navbar, and Footer should not appear
  const hideComponentsPaths = [
    "/registerform", // Add more paths if needed
  ];

  // Check if the current path matches any of the paths in the hideComponentsPaths array
  const shouldHideComponents = hideComponentsPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {/* Conditionally render Sidebar */}
      {!shouldHideComponents && <Sidebar />}
      <div className="main">
        {/* Conditionally render Navbar */}
        {!shouldHideComponents && <Navbar />}
        <main className="content px-3 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/users" element={<Users />} />
            <Route path="/registerform" element={<RegisterForm />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        {/* Conditionally render Footer */}
        {!shouldHideComponents && <Footer />}
      </div>
    </>
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