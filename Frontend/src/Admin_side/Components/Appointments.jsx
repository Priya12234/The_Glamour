import { useState } from "react";


const Appointments = () => {
  const [showModal, setShowModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const todayAppointments = [
    { id: 1, name: "Isha ", service: "Haircut", date: "19-2-2025", time: "10:00 AM" },
    { id: 2, name: "Drashti", service: "Facial", date: "19-2-2025", time: "11:30 AM" },
    { id: 3, name: "Priya", service: "Massage", date: "19-2-2025", time: "1:00 PM" },
    { id: 4, name: "Isha", service: "Hair Color", date: "19-2-2025", time: "3:00 PM" },
    { id: 5, name: "Radhesh", service: "Haircut", date: "19-2-2025", time: "10:00 AM" },
    { id: 6, name: "Vaibhav", service: "Facial", date: "19-2-2025", time: "11:30 AM" },
    { id: 7, name: "Nishant", service: "Massage", date: "19-2-2025", time: "1:00 PM" },
    { id: 8, name: "Jenil", service: "Hair Color", date: "19-2-2025", time: "3:00 PM" },
  ];

  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCancelReason("");
    setSelectedAppointment(null);
  };

  const handleSendCancellation = () => {
    console.log("Cancellation reason:", cancelReason);
    console.log("Cancelled Appointment:", selectedAppointment);
    handleCloseModal();
  };

  return (
    <main className="content px-3 py-4 bg-light">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold fs-4">All Appointments</h3>
          <h5 className="text-muted">{new Date().toLocaleDateString()}</h5>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>SR NO</th>
                      <th>Name</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayAppointments.length > 0 ? (
                      todayAppointments.map((appointment, index) => (
                        <tr key={appointment.id}>
                          <td>{index + 1}</td>
                          <td>{appointment.name}</td>
                          <td>{appointment.service}</td>
                          <td>{appointment.date}</td>
                          <td>{appointment.time}</td>
                          <td>
                            <button className="btn btn-danger btn-sm" onClick={() => handleCancelClick(appointment)}>
                              Cancel
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-info btn-sm">Postpone</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted">
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

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" >
          <div className="modal-dialog" role="document" >
            <div className="modal-content" style={{ backgroundColor: "#D9D9D9" }}>
              <div className="modal-header">
                <h5 className="modal-title">Appointment Cancellation</h5>
                <button type="button" className="close" onClick={handleCloseModal}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Canceling:</strong> {selectedAppointment?.name} - {selectedAppointment?.service}</p>
                <label className="form-label">Describe:</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={handleCloseModal}>
                  Close
                </button>
                <button type="button" className="btn" style={{backgroundColor:"#786670" , color:"white"}}onClick={handleSendCancellation}>
                  Send
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
