
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL || "http://localhost:3000/uploads";

const Orders = () => {
  // ... (previous state declarations remain the same)

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order permanently?")) {
      return;
    }

    setDeletingId(orderId);
    console.log("Attempting to delete order:", orderId); // Debug log

    try {
      console.log("Sending DELETE request to:", `${API_URL}/orders/${orderId}`); // Debug log
      
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Uncomment if your API requires authentication
          // "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
      });

      console.log("Delete response status:", response.status); // Debug log
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Delete error response:", errorData); // Debug log
        throw new Error(errorData.message || `Server responded with status ${response.status}`);
      }

      console.log("Deletion successful, updating UI..."); // Debug log
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      
      // Show success message
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Delete operation failed:", {
        error: error.message,
        stack: error.stack
      }); // Detailed error log
      alert(`Delete failed: ${error.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // In your JSX, add a test button for debugging:
  return (
    <div className="p-4">
      {/* DEBUG SECTION - REMOVE IN PRODUCTION */}
      <div className="mb-4 p-3 bg-yellow-100 rounded-lg">
        <h3 className="font-bold text-yellow-800">Debug Tools</h3>
        <button 
          onClick={() => {
            const testOrderId = prompt("Enter order ID to test delete:");
            if (testOrderId) deleteOrder(testOrderId);
          }}
          className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded"
        >
          Test Delete Endpoint
        </button>
      </div>
      {/* END DEBUG SECTION */}

      {/* ... rest of your existing JSX ... */}
    </div>
  );
};

export default Orders;