import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import BroImage from "../Assets/Images/bro1.png";
import "../Assets/css/login.css";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Static user credentials
    const validEmail = "user@example.com";
    const validPassword = "password123";

    if (email === validEmail && password === validPassword) {
      localStorage.setItem("token", "fakeAuthToken"); // Simulate authentication
      navigate("/"); // Redirect to homepage
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center position-relative">
      <FaArrowLeft
        className="back-arrow"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "24px",
          color: "#35262E",
          cursor: "pointer"
        }}
        onClick={() => navigate("/")}
      />

      <div className="row w-100">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={BroImage} alt="Salon Illustration" className="img-fluid" />
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="login-card shadow w-100 min-vh-75 p-4">
            <h2 className="text-center">Hello! Welcome Back</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="login-form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  className="login-form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="login-text-center">
                <button type="submit" className="login-btn">
                  Login
                </button>
              </div>

              <p className="login-text-center mt-3">
                Dont have an account? <a href="/register">Register Yourself</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
