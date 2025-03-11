import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { FaCheck, FaClock } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const UserAppointments = () => {
  const { userName, userEmail, userNumber } = useParams();
  
  // Static appointment data for all users
  const appointments = [
    { id: 1, service: "Haircut", date: "2025-03-15", time: "10:00 AM", price: 300, status: "Done" },
    { id: 2, service: "Facial", date: "2025-03-16", time: "02:00 PM", price: 500, status: "Pending" },
    { id: 3, service: "Manicure", date: "2025-03-17", time: "04:00 PM", price: 400, status: "Done" },
    { id: 4, service: "Pedicure", date: "2025-03-18", time: "01:00 PM", price: 450, status: "Pending" }
  ];

  return (
    <div className="container mt-4">
      {/* Back Arrow at the Top Left Corner */}
      <div className="mb-4">
        <button
          className="btn btn-link text-decoration-none"
          onClick={() => window.history.back()}
        >
          <BsArrowLeft className="me-2" style={{ color: "black" }} />
        </button>
      </div>

      <h2 className="fw-bold mb-4">Users</h2>
      <div className="card shadow-sm">
        <div className="card-header text-white" style={{ backgroundColor: "#786670" }}>
          <h5 className="card-title mb-0">User Details</h5>
        </div>
        <div className="card-body">
          <p><strong>Name:</strong> {userName}</p>
          <p><strong>Email:</strong> {userEmail}</p>
          <p><strong>Number:</strong> {userNumber}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="fw-bold mb-3">Appointments:</h3>
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
                  <td>{appointment.price}/-</td>
                  <td>
                    {appointment.status === "Done" ? (
                      <span className="d-flex align-items-center">
                        <FaCheck className="text-success me-2" /> Done
                      </span>
                    ) : (
                      <span className="d-flex align-items-center">
                        <FaClock className="text-warning me-2" /> Pending
                      </span>
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
