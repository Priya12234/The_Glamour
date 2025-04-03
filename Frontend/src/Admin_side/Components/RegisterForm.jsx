import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import panaImage from "../../Client_side/Assets/Images/pana.png";
import "../Assets/css/style.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    number: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');
  
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      console.log('Attempting to register user:', formData.email); // Debug log
      
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone_number: formData.number,
          password: formData.password
        }),
      });
  
      console.log('Response status:', response.status); // Debug log
      
      const data = await response.json();
      console.log('Response data:', data); // Debug log
  
      if (!response.ok) {
        // Show server-side validation errors if available
        if (data.errors) {
          setError(data.errors.map(err => err.msg).join(', '));
        } else if (data.message) {
          setError(data.message);
        } else {
          setError('Registration failed: ' + JSON.stringify(data));
        }
        return;
      }
  
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to connect to server');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 position-relative">
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
        onClick={() => navigate("/users")}
      />

      <div className="row w-100 justify-content-center">
        <div className="col-md-6 d-flex justify-content-center align-items-center order-md-1 order-0">
          <img
            src={panaImage}
            alt="Salon Illustration"
            className="img-fluid illustration-register"
          />
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center order-md-2 order-1">
          <div className="card register-card-container shadow p-4 w-100">
            <h2 className="text-center">Register User</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="number" className="form-label">
                  Phone Number:
                </label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="number" 
                  value={formData.number}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password:
                </label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="confirmPassword" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-register-custom">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;