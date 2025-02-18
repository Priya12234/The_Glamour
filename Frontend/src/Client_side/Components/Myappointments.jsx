import  { useState } from "react";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, service: "Haircut", date: "1/1/2025", time: "10:00am" },
    { id: 2, service: "Haircut", date: "1/1/2025", time: "10:00am" },
    { id: 3, service: "Haircut", date: "1/1/2025", time: "10:00am" },
    { id: 4, service: "Haircut", date: "1/1/2025", time: "10:00am" },
  ]);

  const handleCancel = (id) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
  };

  return (
    <div className="container-fluid d-flex flex-wrap" style={{ backgroundColor: "#E0E0E0", fontFamily: "'Kaisei HarunoUmi'" }}>
      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">My Appointment</h2>

        {/* Appointment List */}
        {appointments.map((appt) => (
          <div key={appt.id} className="d-flex justify-content-between align-items-center bg-white p-3 mb-3 shadow-sm rounded">
            <div>
              <strong>You Booked {appt.service} Appointment</strong> <br />
              Date: {appt.date} {appt.time}
            </div>
            <button className="btn btn-danger" onClick={() => handleCancel(appt.id)}>Cancel</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
