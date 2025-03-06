import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheck, FaTimes, FaClock } from "react-icons/fa";

const Orders = () => {
  const user = {
    name: "Priya Chauhan",
    email: "pchauhan862@rku.ac.in",
    number: "9999999999",
  };

  const orders = [
    {
      id: 1,
      product: "Foundation",
      quantity: 2,
      image: "https://via.placeholder.com/40", // Replace with actual image URL
      price: "300/-",
      totalPrice: "600/-",
      status: "Delivered",
    },
    {
      id: 2,
      product: "Foundation",
      quantity: 2,
      image: "https://via.placeholder.com/40", // Replace with actual image URL
      price: "300/-",
      totalPrice: "600/-",
      status: "Pending",
    },
  ];

  return (
    <div className="container mt-4">
      <h3 className="fw-bold">Users</h3>

      {/* User Info Card */}
      <div className="p-3 mt-3" style={{ backgroundColor: "#E3E3E3", borderRadius: "8px" }}>
        <p>
          <strong>Name:</strong> {user.name}
          <br />
          <strong>Email:</strong> <a href={`mailto:${user.email}`}>{user.email}</a>
          <br />
          <strong>Number:</strong> {user.number}
        </p>
      </div>

      {/* Orders Table */}
      <h5 className="fw-bold mt-4">Orders:</h5>
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead style={{ backgroundColor: "#A5909C", color: "white" }}>
            <tr>
              <th>No.</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>
                  <img src={order.image} alt={order.product} style={{ width: "40px", borderRadius: "5px" }} />
                </td>
                <td>{order.price}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.status === "Delivered" ? (
                    <span className="text-success">
                      {order.status} <FaCheck />
                    </span>
                  ) : (
                    <span className="text-warning">
                      {order.status} <FaClock />
                    </span>
                  )}
                </td>
                <td>
                  <button className="btn btn-danger btn-sm">
                    <FaTimes /> Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
