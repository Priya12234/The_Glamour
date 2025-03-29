import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import panaImage from "../Assets/Images/pana.png";
import "../Assets/css/register.css";

const RegisterForm = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 position-relative">
      {/* Back Arrow */}
      <FaArrowLeft
        className="back-arrow"
        style={{
          position: "absolute",
          top: "20px",
          left: "10px",
          fontSize: "24px",
          color: "#35262E",
          cursor: "pointer"
        }}
        onClick={() => navigate("/")}
      />

      <div className="row w-100 justify-content-center">

        {/* Left Section: Illustration */}
        <div className="col-md-6 d-flex justify-content-center align-items-center order-md-1 order-0">
          <img
            src={panaImage}
            alt="Salon Illustration"
            className="img-fluid illustration-register"
          />
        </div>

        {/* Right Section: Registration Form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center order-md-2 order-1">
          <div className="card register-card-container shadow p-4 w-100">
            <h2 className="text-center">Register Yourself</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input type="email" className="form-control" id="email" />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input type="text" className="form-control" id="name" />
              </div>

              <div className="mb-3">
                <label htmlFor="number" className="form-label">
                  Phone Number:
                </label>
                <input type="text" className="form-control" id="number" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input type="password" className="form-control" id="password" />
              </div>

              <div className="mb-3">
                <label htmlFor="confirm-password" className="form-label">
                  Confirm Password:
                </label>
                <input type="password" className="form-control" id="confirm-password" />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-register-custom">
                  Register
                </button>
              </div>

              <p className="text-center-register mt-3" >
                Already have an account? <a href="/loginForm">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;