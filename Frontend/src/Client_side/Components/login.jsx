import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import BroImage from "../Assets/Images/bro1.png";
import "../Assets/css/login.css";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
    <div className="container-fluid d-flex justify-content-center align-items-center login-container">
      {/* Back Arrow */}
      <FaArrowLeft
        className="back-arrow"
        onClick={() => navigate("/")}
      />

      <div className="row w-100">
        {/* Left Side - Image */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={BroImage} alt="Salon Illustration" className="img-fluid" />
        </div>

        {/* Right Side - Login Form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="login-card">
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
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  className="login-form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

              <div className="text-center">
                <button type="submit" className="login-btn">Login</button>
              </div>

              <p className="text-center mt-3">
                Don’t have an account? <a href="/registerForm">Register Yourself</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
