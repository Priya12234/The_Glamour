import { useState, useEffect } from 'react';
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
            <button type="submit" className="btn btn-light w-100 fw-bold">Pay Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
