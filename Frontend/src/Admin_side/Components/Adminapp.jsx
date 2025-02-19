import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Profile from "./Profile";
import Home from "./Home";

const Adminapp = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded((prevState) => !prevState);
  };

  return (
    <Router>
      <div className={`wrapper ${isSidebarExpanded ? "sidebar-expanded" : ""}`}>
        <Sidebar
          isSidebarExpanded={isSidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
        <div className="main">
          <Navbar />
          <main className="content px-3 py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              {/* <Route path="/task" element={<Task />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/settings" element={<Settings />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default Adminapp;
