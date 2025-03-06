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
          <NavLink to="/" className="navbar-brand fs-3">
            The Glamour
          </NavLink>{" "}
          {/* Branding for Sidebar */}
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
            to="/Appointments"
            className={({ isActive }) =>
              `sidebar-link d-flex align-items-center ${
                isActive ? "active" : ""
              }`
            }
          >
            <i className="bi bi-calendar-event me-2"></i> {/* User Plus icon */}
            <span className="sidebar-text">Apointments</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/adminMaintenancePage"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-person"></i>{" "}
            {/* Tools icon for Maintenance */}
            <span>Clients</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/adminComplaints"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-bag"></i>{" "}
            {/* Complaints icon */}
            <span>Products</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/adminHallBookingPage"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-stars"></i>{" "}
            {/* Calendar Check icon for Hall Booking */}
            <span>Services</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/adminNoticeBoardPage"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-clipboard-check"></i>{" "}
            {/* Postcard icon for Notice Board */}
            <span>Feedback</span>
          </NavLink>
        </li>
        
        {/* <li className="sidebar-item">
          <a
            href="#auth"
            className="sidebar-link has-dropdown"
            data-bs-toggle="collapse"
            aria-expanded="false"
            aria-controls="auth"
          >
            <i className="bi bi-shield-lock"></i>{" "}
            <span>Authentication</span>
          </a>
          <ul id="auth" className="sidebar-dropdown list-unstyled collapse">
            <li className="sidebar-item">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <i className="bi bi-box-arrow-in-right"></i>
                Login
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <i className="bi bi-person-plus"></i> 
                Register
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/notification"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-bell-fill"></i>
            <span>Notifications</span>
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className="bi bi-gear"></i>
            <span>Settings</span>
          </NavLink>
        </li> */}
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
