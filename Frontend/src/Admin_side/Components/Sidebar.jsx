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
        <li className="sidebar-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-house-door me-2"></i> {/* Home icon */}
            <span>Home</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/appointments"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-calendar-event me-2"></i> 
            <span>Appointments</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-person"></i> 
            <span>Users</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/product"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-bag"></i> 
            <span>Products</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-box"></i> 
            <span>Orders</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-stars"></i> 
            <span>Services</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/feedbacks"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-clipboard-check"></i> 
            <span>Feedback</span>
          </NavLink>
        </li>
      </ul>
      <div className="sidebar-footer">
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <i className="bi bi-box-arrow-left"></i> {/* Logout icon */}
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
