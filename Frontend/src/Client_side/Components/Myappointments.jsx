import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAppointments(response.data.appointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments");
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(appointments.filter((appt) => appt.appointmentid !== id));
    } catch (err) {
      console.error("Error canceling appointment:", err);
      alert("Failed to cancel appointment");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  if (loading) {
    return <div className="container p-4">Loading appointments...</div>;
  }

  if (error) {
    return <div className="container p-4 text-danger">{error}</div>;
  }

  return (
    <div className="container-fluid d-flex flex-wrap" style={{ backgroundColor: "#E0E0E0", fontFamily: "'Kaisei HarunoUmi'" }}>
      <div className="flex-grow-1 p-4">
        <h2 className="mb-4">My Appointments</h2>

        {appointments.length === 0 ? (
          <div className="alert alert-info">You have no upcoming appointments</div>
        ) : (
          appointments.map((appt) => (
            <div key={appt.appointmentid} className="d-flex justify-content-between align-items-center bg-white p-3 mb-3 shadow-sm rounded">
              <div>
                <strong>You Booked {appt.service} Appointment</strong> <br />
                Date: {formatDate(appt.date)} at {formatTime(appt.time)}
                {appt.details && (
                  <>
                    <br />
                    <small>Details: {appt.details}</small>
                  </>
                )}
              </div>
              <button 
                className="btn btn-danger" 
                onClick={() => handleCancel(appt.appointmentid)}
              >
                Cancel
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;