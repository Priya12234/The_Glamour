// import { useState } from "react";

const Home = () => {
  // const [searchTerm, setSearchTerm] = useState("");

  const todayAppointments = [
    { id: 1, name: "Radhesh", service: "Haircut", date: "19-2-2015", time: "10:00 AM" },
    { id: 2, name: "Vaibhav", service: "Facial", date: "19-2-2015", time: "11:30 AM" },
    { id: 3, name: "Nishant", service: "Massage", date: "19-2-2015", time: "1:00 PM" },
    { id: 4, name: "Jenil", service: "Hair Color", date: "19-2-2015", time: "3:00 PM" },
  ];

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
                <h5 className="mb-0 fw-bold">Today's Appointments</h5>
              </div>
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
                            <button className="btn btn-danger btn-sm">Cancel</button>
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
    </main>
  );
};

export default Home;
