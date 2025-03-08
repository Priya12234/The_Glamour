import { useParams } from "react-router-dom";
import { BsArrowLeft} from "react-icons/bs"; // Import required icons
import { FaCheck, FaClock } from "react-icons/fa";


const UserOrders = () => {
  const { userName, userEmail, userNumber } = useParams();

  // Example order data (you can fetch this from an API or state)
  const orders = [
    { id: 1, product: "Foundation", quantity: 2, price: 300, status: "Delivered" },
    { id: 2, product: "Lipstick", quantity: 1, price: 150, status: "Pending" },
  ];

  // Function to handle cancel action
  const handleCancel = (orderId) => {
    alert(`Cancel order with ID: ${orderId}`);
    // Add your cancel logic here (e.g., update order status in state or API)
  };

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
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{order.price}/-</td>
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
                      disabled={order.status === "Delivered"}
                    >
                      Cancel
                    </button>
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

export default UserOrders;