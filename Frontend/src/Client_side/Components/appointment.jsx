import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bro1Image from '../Assets/Images/bro1.png';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';

function BookingForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    service: '',
    date: '',
    time: { hours: '', minutes: '', amPm: 'AM' },
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      time: { ...prev.time, [name]: value }
    }));
  };

  const validateForm = () => {
    // Check required fields
    if (!formData.name || !formData.email || !formData.phoneNumber || 
        !formData.service || !formData.date || 
        !formData.time.hours || !formData.time.minutes) {
      setError('Please fill in all required fields');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Validate phone number (10-15 digits)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError('Please enter a valid phone number (10-15 digits)');
      return false;
    }

    // Validate time
    const hours = parseInt(formData.time.hours);
    const minutes = parseInt(formData.time.minutes);
    
    if (isNaN(hours)) {
      setError('Please enter valid hours (1-12)');
      return false;
    }

    if (isNaN(minutes)) {
      setError('Please enter valid minutes (0-59)');
      return false;
    }

    if (hours < 1 || hours > 12) {
      setError('Hours must be between 1 and 12');
      return false;
    }

    if (minutes < 0 || minutes > 59) {
      setError('Minutes must be between 0 and 59');
      return false;
    }

    // Validate date is in the future
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError('Please select a future date');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      // Format time with leading zero for minutes
      const formattedTime = `${formData.time.hours}:${String(formData.time.minutes).padStart(2, '0')} ${formData.time.amPm}`;
      
      const response = await axios.post(
        'http://localhost:3000/api/appointments',
        {
          name: formData.name,
          service: formData.service,
          date: formData.date,
          time: formattedTime,
          details: formData.details,
          contactInfo: {
            email: formData.email,
            phone: formData.phoneNumber
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSuccess('Appointment booked successfully!');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        service: '',
        date: '',
        time: { hours: '', minutes: '', amPm: 'AM' },
        details: ''
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/profile', { 
          state: { 
            message: 'Appointment booked successfully!',
            appointment: response.data.appointment 
          } 
        });
      }, 2000);

    } catch (err) {
      let errorMessage = 'Failed to book appointment';
      
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = 'Session expired. Please login again.';
          localStorage.removeItem('token');
          setTimeout(() => navigate('/login'), 1500);
        } else if (err.response.status === 400) {
          errorMessage = err.response.data.message || 'Invalid request data';
        } else if (err.response.status === 409) {
          errorMessage = 'This time slot is already booked. Please choose another time.';
        } else {
          errorMessage = err.response.data.message || 
                       err.response.data.error || 
                       errorMessage;
        }
      } else if (err.request) {
        errorMessage = 'No response from server - please try again later';
      } else {
        errorMessage = err.message || errorMessage;
      }

      setError(errorMessage);
      console.error('Booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container-fluid p-5" style={{position: "relative" }}>
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
          onClick={() => navigate("/feedback")}
        />

        <div className="container p-3 p-md-5" style={{ fontFamily: "'Kaisei HarunoUmi', serif", color: "white" }}>
          <div className="row w-100 align-items-center">
            <div className="col-md-6 text-center">
              <img src={bro1Image} alt="Salon Illustration" className="img-fluid" />
            </div>

            <div className="right-form col-md-6 mx-auto" style={{ background: "#6b5b6b" }}>
              <form className="p-4 shadow-lg rounded" onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Book Your Appointment</h2>

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show">
                    {error}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setError('')}
                    ></button>
                  </div>
                )}

                {success && (
                  <div className="alert alert-success alert-dismissible fade show">
                    {success}
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setSuccess('')}
                    ></button>
                  </div>
                )}

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    className="form-control" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    className="form-control" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    required 
                    disabled={isSubmitting}
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label">Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phoneNumber"
                    className="form-control" 
                    value={formData.phoneNumber} 
                    onChange={handleInputChange} 
                    required 
                    disabled={isSubmitting}
                  />
                </div>

                {/* Service */}
                <div className="mb-3">
                  <label className="form-label">Service *</label>
                  <select 
                    name="service"
                    className="form-select" 
                    value={formData.service} 
                    onChange={handleInputChange} 
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select a service</option>
                    <option value="makeup">Makeup</option>
                    <option value="haircut">Haircut</option>
                    <option value="massage">Massage</option>
                  </select>
                </div>

                {/* Date */}
                <div className="mb-3">
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Time */}
                <div className="mb-3">
                  <label className="form-label">Time *</label>
                  <div className="d-flex align-items-center gap-2">
                    <input 
                      type="number" 
                      name="hours" 
                      className="form-control" 
                      value={formData.time.hours} 
                      onChange={handleTimeChange} 
                      min="1" 
                      max="12" 
                      required 
                      placeholder="HH" 
                      disabled={isSubmitting}
                    />
                    :
                    <input 
                      type="number" 
                      name="minutes" 
                      className="form-control" 
                      value={formData.time.minutes} 
                      onChange={handleTimeChange} 
                      min="0" 
                      max="59" 
                      required 
                      placeholder="MM" 
                      disabled={isSubmitting}
                    />
                    <select 
                      name="amPm" 
                      className="form-select w-auto" 
                      value={formData.time.amPm} 
                      onChange={handleTimeChange}
                      disabled={isSubmitting}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                {/* Details */}
                <div className="mb-4">
                  <label className="form-label">Additional Details</label>
                  <textarea 
                    name="details"
                    className="form-control" 
                    value={formData.details} 
                    onChange={handleInputChange} 
                    rows="3"
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="btn btn-light w-100 fw-bold" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span 
                        className="spinner-border spinner-border-sm me-2" 
                        role="status" 
                        aria-hidden="true"
                      ></span>
                      Booking...
                    </>
                  ) : 'Book Appointment'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingForm;