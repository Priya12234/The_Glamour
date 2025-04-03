import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import BroImage from "../Assets/Images/bro1.png";
import "../Assets/css/login.css";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        userid: data.userid,
        email: data.email,
        name: data.name
      }));

      // Redirect to home page
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
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
            
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  className="login-form-control"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  className="login-form-control"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="text-center">
                <button 
                  type="submit" 
                  className="login-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>

              <p className="text-center mt-3">
                Dont have an account? <a href="/registerForm">Register Yourself</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;