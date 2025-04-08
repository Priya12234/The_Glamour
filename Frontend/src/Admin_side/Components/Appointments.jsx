import { useState, useEffect } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPostponeModal, setShowPostponeModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [postponeDate, setPostponeDate] = useState("");
  const [postponeTime, setPostponeTime] = useState("");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      console.log('Making request to /api/appointments with token:', token);
      
      const response = await fetch('http://localhost:3000/api/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
  
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Error response data:', errorData);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setAppointments(data.appointments || []);
      
    } catch (err) {
      console.error('Fetch error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name
      });
      setError(err.message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };
  const handleCancelAppointment = async () => {
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

      setShowCancelModal(false);
      setCancelReason("");
      fetchAppointments();
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePostponeAppointment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/appointments/${selectedAppointment.appointmentid}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: postponeDate,
          time: postponeTime
        })
      });

      if (!response.ok) {
        throw new Error('Failed to postpone appointment');
      }

      setShowPostponeModal(false);
      setPostponeDate("");
      setPostponeTime("");
      fetchAppointments();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="content px-3 py-4 bg-light">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold fs-4">All Appointments</h3>
          <div className="d-flex align-items-center gap-3">
            <button 
              className="btn btn-primary"
              onClick={fetchAppointments}
            >
              <i className="bi bi-arrow-clockwise"></i> Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger">
            <h4>Error Loading Appointments</h4>
            <p>{error}</p>
            <button 
              className="btn btn-primary"
              onClick={fetchAppointments}
            >
              Retry
            </button>
          </div>
        )}

        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
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
                        <td>{appointment.time || 'N/A'}</td>
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
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                setShowCancelModal(true);
                              }}
                            >
                              <i className="bi bi-x-circle me-1"></i> Cancel
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                setPostponeDate(appointment.date);
                                setPostponeTime(appointment.time.split(' ')[0]);
                                setShowPostponeModal(true);
                              }}
                            >
                              <i className="bi bi-clock me-1"></i> Reschedule
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-muted">
                        {error ? 'Error loading appointments' : 'No appointments found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Appointment Modal */}
      {showCancelModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cancel Appointment</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowCancelModal(false);
                    setCancelReason("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to cancel this appointment?</p>
                <div className="mb-3">
                  <label className="form-label">Reason for cancellation:</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setShowCancelModal(false);
                    setCancelReason("");
                  }}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={handleCancelAppointment}
                  disabled={!cancelReason.trim()}
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Postpone Appointment Modal */}
      {showPostponeModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reschedule Appointment</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowPostponeModal(false);
                    setPostponeDate("");
                    setPostponeTime("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">New Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={postponeDate}
                    onChange={(e) => setPostponeDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">New Time:</label>
                  <input
                    type="time"
                    className="form-control"
                    value={postponeTime}
                    onChange={(e) => setPostponeTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => {
                    setShowPostponeModal(false);
                    setPostponeDate("");
                    setPostponeTime("");
                  }}
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handlePostponeAppointment}
                  disabled={!postponeDate || !postponeTime}
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