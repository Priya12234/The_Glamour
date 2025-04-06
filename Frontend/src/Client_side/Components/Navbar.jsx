import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "../Assets/css/Navbar.css";
import logo from "../Assets/Images/logo-removebg-preview.png";

function NavigationBar() {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return !!localStorage.getItem("token"); // Check if token exists
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user");
    navigate("/loginForm"); // Redirect to login
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-custom py-0 d-flex sticky-top">
        <div className="container">
          <a className="navbar-brand brand-logo me-auto" href="#home">
            <img src={logo} alt="Logo" className="brand-logo-img" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#Benefit">
                  Appointment
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#products">
                  Our Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#ourteam">
                  Our Team
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#feedback">
                  Feedback
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {isLoggedIn() ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      My Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/loginForm">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/registerForm">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavigationBar;