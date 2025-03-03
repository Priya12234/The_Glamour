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
    const validEmail = "user@example.com";
    const validPassword = "password123";

    if (email === validEmail && password === validPassword) {
      localStorage.setItem("token", "fakeAuthToken");
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      {/* Back Arrow */}
      <FaArrowLeft className="back-arrow" onClick={() => navigate("/")} />

      <div className="row w-100 d-flex flex-column flex-md-row align-items-center justify-content-center">
        {/* Top Side - Illustration (for small screens) */}
        <div className="col-12  col-md-6 d-flex justify-content-center mb-4 mb-md-0">
          <img src={BroImage} alt="Salon Illustration" className="img-fluid w-75 w-md-75" />
        </div>

        {/* Bottom Side - Login Form */}
        <div className="col-12 col-md-6 d-flex justify-content-center">
          <div className="login-card p-4 shadow w-100 max-w-400 min-vh-50 d-flex flex-column justify-content-center">
            <h2 className="text-center">Hello! Welcome Back</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn login-btn w-100">Login</button>
              </div>

              <p className="text-center mt-3">
                Don’t have an account? <a href="/register">Register Yourself</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
