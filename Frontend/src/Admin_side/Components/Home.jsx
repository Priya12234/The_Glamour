import { useState, useEffect } from "react";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPostponeModal, setShowPostponeModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newAmPm, setNewAmPm] = useState("AM");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get today's date in YYYY-MM-DD format
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Filter appointments to only show today's appointments
const getTodaysAppointments = () => {
  const today = getTodayDate();
  
  // Debug logs to see what we're comparing
  console.log("Today's date:", today);
  console.log("All appointments:", appointments);
  
  const filtered = appointments.filter(appointment => {
    // Ensure the appointment has a date
    if (!appointment.date) return false;
    
    // Normalize the appointment date by taking only the date part (in case it includes time)
    const appointmentDateOnly = appointment.date.split('T')[0];
    console.log(`Comparing: ${appointmentDateOnly} === ${today}`, appointmentDateOnly === today);
    
    return appointmentDateOnly === today;
  });
  
  console.log("Filtered appointments:", filtered);
  return filtered;
};

  // Fetch all appointments from the database
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/appointments/adminalldata`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }

        const data = await response.json();
        setAppointments(data.appointments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter appointments to only show today's appointments
  // const getTodaysAppointments = () => {
  //   const today = getTodayDate();
  //   return appointments.filter(appointment => appointment.date === today);
  // };

  // Format time to AM/PM format for display
  const formatTime = (timeString) => {
    if (!timeString) return '';

    const [hours, minutes] = timeString.split(':');
    const hourNum = parseInt(hours, 10);

    if (hourNum >= 12) {
      return `${hourNum === 12 ? 12 : hourNum - 12}:${minutes} PM`;
    } else {
      return `${hourNum === 0 ? 12 : hourNum}:${minutes} AM`;
    }
  };

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handlePostponeClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPostponeModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCancelReason("");
    setSelectedAppointment(null);
  };

  const handleClosePostponeModal = () => {
    setShowPostponeModal(false);
    setNewDate("");
    setNewTime("");
    setNewAmPm("AM");
    setSelectedAppointment(null);
  };

  const handleSendCancellation = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/appointments/${selectedAppointment.appointmentid}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cancelReason })
      });

      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }

      // Update local state by removing the cancelled appointment
      setAppointments(appointments.filter(
        app => app.appointmentid !== selectedAppointment.appointmentid
      ));

      handleCloseModal();
    } catch (err) {
      console.error("Cancellation error:", err);
      setError(err.message);
    }
  };

  const handleSendPostponement = async () => {
    try {
      const fullNewTime = `${newTime} ${newAmPm}`;

      const response = await fetch(`http://localhost:3000/api/appointments/${selectedAppointment.appointmentid}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: newDate,
          time: fullNewTime
        })
      });

      if (!response.ok) {
        throw new Error('Failed to postpone appointment');
      }

      const updatedAppointment = await response.json();

      // Update local state with the postponed appointment
      setAppointments(appointments.map(app =>
        app.appointmentid === selectedAppointment.appointmentid
          ? updatedAppointment.appointment
          : app
      ));

      handleClosePostponeModal();
    } catch (err) {
      console.error("Postponement error:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <main className="content px-3 py-4 bg-light">
        <div className="container-fluid">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="content px-3 py-4 bg-light">
        <div className="container-fluid">
          <div className="alert alert-danger" role="alert">
            Error loading appointments: {error}
          </div>
        </div>
      </main>
    );
  }

  const todaysAppointments = getTodaysAppointments();

  return (
    <main className="content px-3 py-4 bg-light">
      <div className="container-fluid">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold fs-4">Admin Dashboard</h3>
          <h5 className="text-muted">{new Date().toLocaleDateString()}</h5>
        </div>

        {/* Today's Appointments Table */}
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-bold">Todays Appointments</h5>
              </div>
              <div className="card-body">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>SR NO</th>
                      <th>Name</th>
                      <th>Service</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todaysAppointments.length > 0 ? (
                      todaysAppointments.map((appointment, index) => (
                        <tr key={appointment.appointmentid}>
                          <td>{index + 1}</td>
                          <td>{appointment.name}</td>
                          <td>{appointment.service}</td>
                          <td>{formatTime(appointment.time)}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm me-2"
                              onClick={() => handleCancelClick(appointment)}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => handlePostponeClick(appointment)}
                            >
                              Postpone
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center text-muted">
                          No appointments for today.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancellation Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content" style={{ backgroundColor: "#D9D9D9" }}>
              <div className="modal-header">
                <h5 className="modal-title">Appointment Cancellation</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Canceling:</strong> {selectedAppointment?.name} - {selectedAppointment?.service}
                </p>
                <label className="form-label">Reason:</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Please specify the reason for cancellation"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSendCancellation}
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Postponement Modal */}
      {showPostponeModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content" style={{ backgroundColor: "#D9D9D9" }}>
              <div className="modal-header">
                <h5 className="modal-title">Appointment Postponement</h5>
                <button type="button" className="close" onClick={handleClosePostponeModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Postponing:</strong> {selectedAppointment?.name} - {selectedAppointment?.service}
                </p>
                <p>
                  <strong>Current Time:</strong> {formatTime(selectedAppointment?.time)}
                </p>
                <div className="mb-3">
                  <label className="form-label">New Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">New Time:</label>
                  <div className="input-group">
                    <input
                      type="time"
                      className="form-control"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                    />
                    <select
                      className="form-control"
                      value={newAmPm}
                      onChange={(e) => setNewAmPm(e.target.value)}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClosePostponeModal}>
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSendPostponement}
                >
                  Confirm Postponement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;