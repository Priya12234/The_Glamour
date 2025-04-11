import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { FaCheck, FaClock } from "react-icons/fa";

const UserOrders = () => {
  const { userName, userEmail, userNumber } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get the user ID from the token or wherever it's stored
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        // Fetch orders from your backend API
        const response = await fetch("http://localhost:3000/api/orders", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`http://localhost:3000/api/orders/${orderId}/cancel`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to cancel order: ${response.status}`);
      }

      // Update the local state to reflect the cancellation
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: "Cancelled" } : order
      ));

      alert("Order cancelled successfully");
    } catch (err) {
      alert(`Error cancelling order: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          Error loading orders: {error}
        </div>
        <button className="btn btn-secondary" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Back Arrow at the Top Left Corner */}
      <div className="mb-4">
        <button
          className="btn btn-link text-decoration-none"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft className="me-2" style={{ color: "black" }} />
        </button>
      </div>

      <h2 className="fw-bold mb-4">User Orders</h2>
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
        <h4 className="fw-bold mb-3">Order History</h4>
        {orders.length === 0 ? (
          <div className="alert alert-info">No orders found</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.product_name || order.product}</td>
                    <td>{order.quantity}</td>
                    <td>{order.total || order.price}/-</td>
                    <td>
                      {order.status === "Delivered" ? (
                        <span className="d-flex align-items-center">
                          <FaCheck className="text-success me-2" /> Delivered
                        </span>
                      ) : (
                        <span className="d-flex align-items-center">
                          <FaClock className="text-warning me-2" /> Pending
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleCancel(order.id)}
                        disabled={order.status === "Delivered" || order.status === "Cancelled"}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;