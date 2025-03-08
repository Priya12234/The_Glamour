import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const UserAppointments = () => {
  // Sample user data (Replace with dynamic data fetching)
  const user = {
    name: "Priya Chauhan",
    email: "pchauahan862@rku.ac.in",
    number: "9999999999",
  };

  // Sample appointment data (Replace with API data)
  const appointments = [
    {
      id: 1,
      service: "Hairstyle",
      date: "11-2-2025",
      time: "10:30 AM",
      price: "300/-",
      status: "Done",
    },
    {
      id: 2,
      service: "Spa",
      date: "12-2-2025",
      time: "11:30 AM",
      price: "300/-",
      status: "Pending",
    },
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="container-fluid p-4">
        <h2 className="mb-3">Users</h2>

        {/* User Info */}
        <div className="card p-3 mb-4 shadow-sm">
          <button className="btn btn-light mb-2">&larr; Back</button>
          <p><strong>Name:</strong> {user.name}</p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${user.email}`} className="text-primary">
              {user.email}
            </a>
          </p>
          <p><strong>Number:</strong> {user.number}</p>
        </div>

        {/* Appointments Table */}
        <h3 className="mb-3">Appointments:</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>No.</th>
                <th>Services</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={appointment.id}>
                  <td>{index + 1}</td>
                  <td>{appointment.service}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.price}</td>
                  <td>
                    {appointment.status === "Done" ? (
                      <span className="badge bg-success">Done ✅</span>
                    ) : (
                      <span className="badge bg-warning text-dark">Pending ⏳</span>
                    )}
                  </td>
                  <td>
                    {appointment.status !== "Done" && (
                      <button className="btn btn-danger btn-sm">Cancel</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserAppointments;
