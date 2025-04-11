import { useState, useEffect } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPostponeModal, setShowPostponeModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newAmPm, setNewAmPm] = useState("AM");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch('http://localhost:3000/api/appointments/adminalldata', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setAppointments(data.appointments || []);
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handlePostponeClick = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDate(appointment.date);
    setNewTime(appointment.time.split(' ')[0]);
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
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/appointments/${selectedAppointment.appointmentid}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason: cancelReason })
      });
  
      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }
  
      const result = await response.json();
      if (result.success) {
        alert(`Appointment cancelled successfully. A confirmation email has been sent to ${selectedAppointment.contact_email}`);
      }
  
      fetchAppointments();
      handleCloseModal();
    } catch (err) {
      console.error("Cancellation error:", err);
      setError(err.message);
    }
  };
  
  const handleSendPostponement = async () => {
    try {
      const fullNewTime = `${newTime} ${newAmPm}`;
      const token = localStorage.getItem('token');
  
      const response = await fetch(`http://localhost:3000/api/appointments/${selectedAppointment.appointmentid}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
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
  
      const result = await response.json();
      if (result.success) {
        alert(`Appointment rescheduled successfully. A confirmation email has been sent to ${selectedAppointment.contact_email}`);
      }
  
      fetchAppointments();
      handleClosePostponeModal();
    } catch (err) {
      console.error("Postponement error:", err);
      setError(err.message);
    }
  };

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

  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
            <button 
              className="btn btn-primary ms-3"
              onClick={fetchAppointments}
            >
              Retry
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="content px-3 py-4 bg-light">
      <div className="container-fluid">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold fs-4">All Appointments</h3>
          
        </div>

        {/* Appointments Table */}
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fw-bold">Appointment List</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>SR NO</th>
                        <th>Name</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Contact</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.length > 0 ? (
                        appointments.map((appointment, index) => (
                          <tr key={appointment.appointmentid || index}>
                            <td>{index + 1}</td>
                            <td>{appointment.name || 'N/A'}</td>
                            <td>{appointment.service || 'N/A'}</td>
                            <td>{formatDisplayDate(appointment.date)}</td>
                            <td>{formatTime(appointment.time)}</td>
                            <td>
                              {appointment.contact_email && (
                                <div className="text-truncate" style={{ maxWidth: '150px' }}>
                                  <i className="bi bi-envelope me-2"></i>
                                  {appointment.contact_email}
                                </div>
                              )}
                              {appointment.contact_phone && (
                                <div>
                                  <i className="bi bi-telephone me-2"></i>
                                  {appointment.contact_phone}
                                </div>
                              )}
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleCancelClick(appointment)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="btn btn-info btn-sm"
                                  onClick={() => handlePostponeClick(appointment)}
                                >
                                  Reschedule
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center text-muted">
                            No appointments found
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
                  disabled={!cancelReason.trim()}
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
                <h5 className="modal-title">Appointment Rescheduling</h5>
                <button type="button" className="close" onClick={handleClosePostponeModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Rescheduling:</strong> {selectedAppointment?.name} - {selectedAppointment?.service}
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
                  disabled={!newDate || !newTime}
                >
                  Confirm Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Appointments;
