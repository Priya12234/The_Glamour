import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bro1Image from '../Assets/Images/bro1.png';
import { FaArrowLeft } from "react-icons/fa";

function BookingForm() {
  const navigate = useNavigate();

  // State variables for form fields
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState({ hours: '', minutes: '', amPm: 'AM' });
  const [details, setDetails] = useState('');
  const [totalPayment, setTotalPayment] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Service price map
  const servicePrices = {
    makeup: 50,
    haircut: 30,
    massage: 40,
  };

  // Handle changes for each input field
  const handleInputChange = (setter) => (event) => setter(event.target.value);

  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    setTime({ ...time, [name]: value });
  };

  // Calculate total payment based on selected service
  useEffect(() => {
    if (service) {
      setTotalPayment(servicePrices[service] || 0);
    } else {
      setTotalPayment(0);
    }
  }, [service]);

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  // Handle Razorpay payment
  const initiatePayment = async () => {
    setIsProcessing(true);
    
    try {
      // In a real app, you would call your backend API to create an order
      // For demo purposes, we'll simulate this with frontend-only code
      const options = {
        key: 'rzp_test_vsPKBYMOs5z55L', // Replace with your Razorpay key
        amount: totalPayment * 100, // Razorpay uses paise (1 INR = 100 paise)
        currency: 'USD',
        name: 'Appointment Booking',
        description: `Payment for ${service} service`,
        image: '', // Add your logo URL here
        order_id: '', // This comes from your backend in a real app
        handler: function(response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          // Here you would typically send the payment details to your backend
          console.log('Payment successful:', response);
          
          // Reset form after successful payment
          setEmail('');
          setFullName('');
          setPhoneNumber('');
          setService('');
          setDate('');
          setTime({ hours: '', minutes: '', amPm: 'AM' });
          setDetails('');
          setTotalPayment(0);
          
          // Navigate to success page or home
          navigate('/profile');
        },
        prefill: {
          name: fullName,
          email: email,
          contact: phoneNumber
        },
        notes: {
          address: 'Appointment Booking',
          service: service,
          appointment: `${date} at ${time.hours}:${time.minutes} ${time.amPm}`
        },
        theme: {
          color: '#6b5b6b'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate form fields
    if (!email || !fullName || !phoneNumber || !service || !date || !time.hours || !time.minutes) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate time
    if (time.hours < 1 || time.hours > 12 || time.minutes < 0 || time.minutes > 59) {
      alert('Please enter a valid time');
      return;
    }

    console.log('Form Submitted:', {
      email,
      fullName,
      phoneNumber,
      service,
      date,
      time,
      details,
      totalPayment,
    });

    // Initiate payment
    await initiatePayment();
  };

  return (
    <>
      <div className="container-fluid p-5" style={{position: "relative" }}>
        {/* Back Arrow */}
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
          onClick={() => navigate("/")} // Navigate back to the landing page
        />

        <div className="container p-3 p-md-5" style={{ fontFamily: "'Kaisei HarunoUmi', serif", color: "white" }}>
          <div className="row w-100 align-items-center">
            {/* Left Section: Illustration */}
            <div className="col-md-6 text-center">
              <img src={bro1Image} alt="Salon Illustration" className="img-fluid" />
            </div>

            {/* Right Section: Form */}
            <div className="right-form col-md-6 mx-auto" style={{ background: "#6b5b6b" }}>
              <form className="p-4 shadow-lg rounded" onSubmit={handleSubmit}>
                <h2 className="text-center">Book Your Appointment</h2>

                {/* Email */}
                <div className="mb-3">
                  <label className="form-label" htmlFor="email">Email:</label>
                  <input type="email" id="email" className="form-control" value={email} onChange={handleInputChange(setEmail)} required />
                </div>

                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label" htmlFor="fullName">Full Name:</label>
                  <input type="text" id="fullName" className="form-control" value={fullName} onChange={handleInputChange(setFullName)} required />
                </div>

                {/* Phone Number */}
                <div className="mb-3">
                  <label className="form-label" htmlFor="phoneNumber">Phone Number:</label>
                  <input type="tel" id="phoneNumber" className="form-control" value={phoneNumber} onChange={handleInputChange(setPhoneNumber)} required />
                </div>

                {/* Service Selection */}
                <div className="mb-3">
                  <label className="form-label" htmlFor="service">Service You Would Like to Book:</label>
                  <select id="service" className="form-select" value={service} onChange={handleInputChange(setService)} required>
                    <option value="">Select a service</option>
                    <option value="makeup">Makeup</option>
                    <option value="haircut">Haircut</option>
                    <option value="massage">Massage</option>
                  </select>
                </div>

                {/* Appointment Date */}
                <div className="mb-3">
                  <label className="form-label" htmlFor="appointmentDate">Preferred Appointment Date:</label>
                  <input
                    type="date"
                    id="appointmentDate"
                    className="form-control"
                    value={date}
                    onChange={handleInputChange(setDate)}
                    required
                  />
                </div>

                {/* Appointment Time */}
                <div className="mb-3">
                  <label className="form-label">Preferred Appointment Time:</label>
                  <div className="d-flex align-items-center gap-2">
                    <input type="number" name="hours" className="form-control" value={time.hours} onChange={handleTimeChange} min="1" max="12" required placeholder="HH" />
                    :
                    <input type="number" name="minutes" className="form-control" value={time.minutes} onChange={handleTimeChange} min="0" max="59" required placeholder="MM" />
                    <select name="amPm" className="form-select w-auto" value={time.amPm} onChange={handleTimeChange}>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                {/* Other Details */}
                <div className="mb-3">
                  <label className="form-label" htmlFor="details">Other Details:</label>
                  <textarea id="details" className="form-control" value={details} onChange={handleInputChange(setDetails)} rows="3"></textarea>
                </div>

                {/* Payment Information */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Your Total Payment is: ${totalPayment}</label>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-light w-100 fw-bold" disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : 'Pay Now'}
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