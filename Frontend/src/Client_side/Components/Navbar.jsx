import "../Assets/css/Navbar.css";
import logo from "../Assets/Images/logo-removebg-preview.png"

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
                                <a className="nav-link" href="#appointment">Appointment</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#products">Our Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#feedback">Feedback</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#team">Our Team</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#login">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#register">Register</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavigationBar;
