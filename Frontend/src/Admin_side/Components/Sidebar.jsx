import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../Assets/css/style.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <aside id="sidebar" className={isExpanded ? "expand" : ""}>
      <div className="d-flex">
        <button className="toggle-btn" type="button" onClick={toggleSidebar}>
          <i className="bi bi-grid"></i> {/* Sidebar toggle icon */}
        </button>
        <div className="sidebar-logo">
          <NavLink to="/" className="navbar-brand fs-4">
            The Glamour
          </NavLink>
        </div>
      </div>

      <ul className="sidebar-nav">
        <SidebarItem to="/" icon="bi-house-door" label="Home" />
        <SidebarItem to="/appointments" icon="bi-calendar-event" label="Appointments" />
        <SidebarItem to="/users" icon="bi-person" label="Users" />
        <SidebarItem to="/product" icon="bi-bag" label="Products" />
        <SidebarItem to="/orders" icon="bi-box" label="Orders" />
        <SidebarItem to="/services" icon="bi-stars" label="Services" />
        <SidebarItem to="/feedbacks" icon="bi-clipboard-check" label="Feedback" /> {/* ✅ Feedback Page Added */}
      </ul>

      <div className="sidebar-footer">
        <SidebarItem to="/logout" icon="bi-box-arrow-left" label="Logout" />
      </div>
    </aside>
  );
};

// ✅ Reusable Sidebar Item Component
const SidebarItem = ({ to, icon, label }) => (
  <li className="sidebar-item">
    <NavLink
      to={to}
      className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
    >
      <i className={`bi ${icon} me-2`}></i> 
      <span>{label}</span>
    </NavLink>
  </li>
);

export default Sidebar;
