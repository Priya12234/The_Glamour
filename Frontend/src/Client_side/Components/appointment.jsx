import { useState } from 'react';
import '../Assets/css/appointment.css';
import bro1Image from '../Assets/Images/bro1.png';

function BookingForm() {
  // State variables for form fields
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState({ hours: '', minutes: '', amPm: 'AM' });
  const [details, setDetails] = useState('');
  const [totalPayment, setTotalPayment] = useState(0);

  // Service pricing (Example: Adjust prices as needed)
  const servicePrices = {
    makeup: 50,
    haircut: 30,
    massage: 40,
  };

  // Handle changes for each input field
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleFullNameChange = (event) => setFullName(event.target.value);
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handleDetailsChange = (event) => setDetails(event.target.value);

  // Fix handleDateChange
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  // Update service and calculate total payment
  const handleServiceChange = (event) => {
    const selectedService = event.target.value;
    setService(selectedService);

    // Set total payment based on selected service price
    setTotalPayment(servicePrices[selectedService] || 0);
  };

  const handleTimeChange = (event) => {
    const { name, value } = event.target;
    setTime((prevTime) => ({ ...prevTime, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
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
  };

  return (
    <div className="container">
      {/* Left Section: Illustration */}
      <div className="left-section">
        <img src={bro1Image} alt="Salon Illustration" />
      </div>

      {/* Right Section: Form */}
      <div className="right-section">
        <form onSubmit={handleSubmit}>
          <h2>Book Your Appointment</h2>

          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={handleEmailChange} required />
          </div>

          <div>
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" value={fullName} onChange={handleFullNameChange} required />
          </div>

          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} required />
          </div>

          <div>
            <label htmlFor="service">Service You Would Like to Book:</label>
            <select id="service" value={service} onChange={handleServiceChange} required>
              <option value="">Select a service</option>
              <option value="makeup">Makeup - $50</option>
              <option value="haircut">Haircut - $30</option>
              <option value="massage">Massage - $40</option>
            </select>
          </div>

          <div>
            <label htmlFor="date">Preferred Appointment Date:</label>
            <input type="date" id="date" value={date} onChange={handleDateChange} required />
          </div>

          <div>
            <label>Preferred Appointment Time:</label>
            <div className="time-inputs">
              <input
                type="number"
                name="hours"
                value={time.hours}
                onChange={handleTimeChange}
                min="1"
                max="12"
                required
                placeholder="HH"
              />
              :
              <input
                type="number"
                name="minutes"
                value={time.minutes}
                onChange={handleTimeChange}
                min="0"
                max="59"
                required
                placeholder="MM"
              />
              <select name="amPm" value={time.amPm} onChange={handleTimeChange}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="details">Other Details:</label>
            <textarea id="details" value={details} onChange={handleDetailsChange}></textarea>
          </div>

          <div>
            <label>Your Total Payment is: ${totalPayment}</label>
          </div>

          <button type="submit">Pay Now</button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
