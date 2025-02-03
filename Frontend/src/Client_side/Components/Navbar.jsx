import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "../Assets/css/Navbar.css";
import logo from "../Assets/Images/logo-removebg-preview.png";

function NavigationBar() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom py-0">
                <div className="container">
                    <a className="navbar-brand brand-logo" href="#home">
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
                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <a className="nav-link" href="#home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#services">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#Benefit">Appointment</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#products">Our Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#ourteam">Our Team</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#feedback">Feedback</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/loginForm">Login</Link> {/* Using React Router Link */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/registerForm">Register</Link> {/* Using React Router Link */}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavigationBar;
