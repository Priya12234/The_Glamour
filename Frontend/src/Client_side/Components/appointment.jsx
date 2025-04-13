import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import bro1Image from '../Assets/Images/bro1.png';


// Configuration - replace with your actual values
const API_BASE_URL = 'http://localhost:3000/api';
const RAZORPAY_KEY_ID = 'rzp_test_vIuMy0XBJi8Zpc'; // Replace with your actual test/live key

const BookingForm = () => {
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
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const servicePrices = {
    makeup: 1500,
    haircut: 800,
    massage: 1200
  };

  // Load Razorpay script on component mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      setError('Failed to load payment gateway');
      setRazorpayLoaded(false);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
    // Clear previous errors
    setError('');

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

    // Validate phone number
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError('Please enter a valid phone number (10-15 digits)');
      return false;
    }

    // Validate time
    const hours = parseInt(formData.time.hours);
    const minutes = parseInt(formData.time.minutes);
    
    if (isNaN(hours) || hours < 1 || hours > 12) {
      setError('Please enter valid hours (1-12)');
      return false;
    }

    if (isNaN(minutes) || minutes < 0 || minutes > 59) {
      setError('Please enter valid minutes (0-59)');
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

  const createAppointment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const formattedTime = `${formData.time.hours}:${String(formData.time.minutes).padStart(2, '0')} ${formData.time.amPm}`;
    
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        service: formData.service,
        date: formData.date,
        time: formattedTime,
        details: formData.details,
        contact_email: formData.email,
        contact_phone: formData.phoneNumber
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create appointment');
    }

    return await response.json();
  };

  const createRazorpayOrder = async (appointmentId) => {
    const token = localStorage.getItem('token');
    const amount = servicePrices[formData.service] * 100; // Convert to paise

    const response = await fetch(`${API_BASE_URL}/payments/create-order`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount,
        appointmentId
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create payment order');
    }

    return await response.json();
  };

  const verifyPayment = async (paymentResponse) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/payments/verify`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentResponse)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Payment verification failed');
    }

    return await response.json();
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ payment_status: status })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update appointment');
    }

    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    if (!razorpayLoaded) {
      setError('Payment gateway is still loading. Please try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create appointment
      const appointment = await createAppointment();
      
      // 2. Create Razorpay order
      const order = await createRazorpayOrder(appointment.appointment.appointmentid);

      // 3. Open Razorpay payment modal
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'The Glamour Salon',
        description: `Payment for ${formData.service}`,
        order_id: order.orderId,
        handler: async (response) => {
          try {
            // 4. Verify payment
            const verification = await verifyPayment(response);
            
            if (verification.success) {
              // 5. Update appointment status
              await updateAppointmentStatus(appointment.appointment.appointmentid, 'completed');
              
              setSuccess('Appointment booked successfully!');
              setTimeout(() => navigate('/profile'), 2000);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (err) {
            console.error('Payment verification error:', err);
            setError(err.message || 'Payment verification failed');
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phoneNumber
        },
        theme: {
          color: '#6b5b6b'
        },
        modal: {
          ondismiss: () => {
            setError('Payment was cancelled');
            setIsSubmitting(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error('Booking error:', err);
      setError(err.message || 'Failed to complete booking');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid p-5" style={{ position: "relative" }}>
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
        onClick={() => navigate(-1)}
      />

      <div className="container p-3 p-md-5">
        <div className="row w-100 align-items-center">
        <div className="col-md-6 text-center">
              <img src={bro1Image} alt="Salon Illustration" className="img-fluid" />
            </div>


          <div className="col-md-6 mx-auto" style={{ 
            background: "#6b5b6b", 
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
          }}>
            <form className="p-4" onSubmit={handleSubmit}>
              <h2 className="text-center mb-4 text-white">Book Your Appointment</h2>

              {error && (
                <div className="alert alert-danger alert-dismissible fade show mb-4">
                  {error}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setError('')}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              {success && (
                <div className="alert alert-success alert-dismissible fade show mb-4">
                  {success}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setSuccess('')}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <div className="mb-3">
                <label className="form-label text-white">Full Name *</label>
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

              <div className="mb-3">
                <label className="form-label text-white">Email *</label>
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

              <div className="mb-3">
                <label className="form-label text-white">Phone Number *</label>
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

              <div className="mb-3">
                <label className="form-label text-white">Service *</label>
                <select
                  name="service"
                  className="form-select"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select a service</option>
                  <option value="makeup">Makeup (₹1500)</option>
                  <option value="haircut">Haircut (₹800)</option>
                  <option value="massage">Massage (₹1200)</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label text-white">Date *</label>
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

              <div className="mb-3">
                <label className="form-label text-white">Time *</label>
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

              <div className="mb-4">
                <label className="form-label text-white">Additional Details</label>
                <textarea
                  name="details"
                  className="form-control"
                  value={formData.details}
                  onChange={handleInputChange}
                  rows="3"
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-light w-100 fw-bold py-2"
                disabled={isSubmitting || !razorpayLoaded}
                style={{
                  backgroundColor: "#f8f9fa",
                  border: "none",
                  transition: "all 0.3s"
                }}
              >
                {isSubmitting ? (
                  <>
                    <span 
                      className="spinner-border spinner-border-sm me-2" 
                      role="status" 
                      aria-hidden="true"
                    ></span>
                    Processing...
                  </>
                ) : (
                  razorpayLoaded ? 'Proceed to Payment' : 'Loading Payment...'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;