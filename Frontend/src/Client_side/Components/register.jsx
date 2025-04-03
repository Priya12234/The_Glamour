import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import panaImage from "../Assets/Images/pana.png";
import "../Assets/css/register.css";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
  
    // Validation remains the same...
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          number: formData.number,
          password: formData.password
        }),
      });
  
      const data = await response.json();
      console.log('Full response:', { status: response.status, data }); // Debug log
  
      if (!response.ok) {
        // More detailed error extraction
        const errorMsg = data.message || 
                        data.error || 
                        (data.errors && data.errors.map(e => e.msg).join(', ')) || 
                        'Registration failed';
        throw new Error(errorMsg);
      }
  
      navigate('/loginForm');
    } catch (err) {
      console.error('Full registration error:', {
        message: err.message,
        stack: err.stack,
        responseData: err.response?.data // If available
      });
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            
            {/* Error message display */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

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
                  minLength="6"
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
                  minLength="6"
                />
              </div>

              <div className="text-center">
                <button 
                  type="submit" 
                  className="btn btn-register-custom"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>
              </div>

              <p className="text-center-register mt-3">
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