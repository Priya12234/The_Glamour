import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import foundation from "../Assets/Images/foundation.png";
const MyCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items from backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        setCartItems(data.orders.map(order => ({
          id: order.orderid,
          productid: order.productid,
          name: order.product_name,
          price: order.total / order.quantity,
          quantity: order.quantity,
          total: order.total,
          image: order.product_image || foundation
        })));
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch cart items:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (id, amount) => {
    try {
      setIsProcessing(true);
      const itemToUpdate = cartItems.find(item => item.id === id);
      const newQuantity = Math.max(1, itemToUpdate.quantity + amount);
      const token = localStorage.getItem("token");
      
      // Update quantity in backend
      const response = await fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: newQuantity,
          total: itemToUpdate.price * newQuantity
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local state
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity, total: itemToUpdate.price * newQuantity } : item
      ));
    } catch (err) {
      console.error("Failed to update quantity:", err);
      alert("Failed to update quantity. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = async (id) => {
    try {
      setIsProcessing(true);
      const token = localStorage.getItem("token");
      
      // Cancel order in backend
      const response = await fetch(`http://localhost:3000/api/orders/${id}/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove from local state
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (err) {
      console.error("Failed to cancel order:", err);
      alert("Failed to cancel order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.total || item.price * item.quantity), 0);
  };

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
  
    setIsProcessing(true);
    
    try {
      // 1. Create payment order
      const orderResponse = await fetch("http://localhost:3000/api/orders/create-payment-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          amount: getTotal() * 100,
          items: cartItems.map(item => ({ id: item.id }))
        }),
      });
  
      if (!orderResponse.ok) throw new Error('Failed to create payment order');
      const orderData = await orderResponse.json();
  
      // 2. Open Razorpay checkout
      const options = {
        key: 'rzp_test_vsPKBYMOs5z55L',
        amount: orderData.amount,
        currency: 'INR',
        name: 'Beauty Products',
        order_id: orderData.razorpayOrderId,
        handler: async function(response) {
          try {
            // 3. Verify payment on your server
            const verifyResponse = await fetch("http://localhost:3000/api/orders/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                orderIds: cartItems.map(item => item.id)
              }),
            });
  
            if (!verifyResponse.ok) throw new Error('Payment verification failed');
            
            alert('Payment successful! Order completed.');
            setCartItems([]);
            navigate('/ourservice');
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '8320050619'
        },
        theme: {
          color: '#786670'
        }
      };
  
      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', async function(response) {
        try {
          await fetch("http://localhost:3000/api/orders/payment-failed", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              orderIds: cartItems.map(item => item.id)
            }),
          });
          alert(`Payment failed. Please try again. Error: ${response.error.description}`);
        } catch (error) {
          console.error('Failed to handle payment failure:', error);
          alert('Payment failed and we couldn\'t revert your cart. Please contact support.');
        }
      });
  
      razorpay.open();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-5">Loading your cart...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error: {error}</div>;
  }

  return (
    <>
      <div className="container-fluid p-4" style={{ backgroundColor: "#E0E0E0", fontFamily: "'Kaisei HarunoUmi'" }}>
        {/* Cart Content */}
        <div className="row justify-content-center">
          {/* Cart Table */}
          <div className="col-12 col-md-10 col-lg-8">
            <h2 className="mb-4 text-center">My Cart</h2>
            {cartItems.length === 0 ? (
              <div className="text-center py-5">
                <p>Your cart is empty</p>
                <button 
                  className="btn px-4 py-2" 
                  style={{
                    backgroundColor: "#786670",
                    color: "black",
                    fontSize: "18px"
                  }}
                  onClick={() => navigate('/ourservice')}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table">
                    <thead style={{ backgroundColor: "#E0E0E0" }}>
                      <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Cancel Order</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody style={{ backgroundColor: "#E0E0E0" }}>
                      {cartItems.map(item => (
                        <tr key={item.id}>
                          <td className="d-flex align-items-center">
                            <img src={item.image} alt={item.name} width="50" className="me-2 img-fluid" />
                            <div>{item.name} <br /> <small>ID: {item.productid}</small></div>
                          </td>
                          <td>₹{item.price}</td>
                          <td>
                            <button 
                              className="btn btn-outline-secondary btn-sm me-2" 
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={isProcessing}
                            >
                              -
                            </button>
                            {item.quantity}
                            <button 
                              className="btn btn-outline-secondary btn-sm ms-2" 
                              onClick={() => handleQuantityChange(item.id, 1)}
                              disabled={isProcessing}
                            >
                              +
                            </button>
                          </td>
                          <td>
                            <button 
                              className="btn btn-danger btn-sm px-2" 
                              onClick={() => handleCancel(item.id)}
                              disabled={isProcessing}
                            >
                              Cancel
                            </button>
                          </td>
                          <td>₹{item.total || item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Grand Total */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">
                  <h4 className="mb-3 mb-md-0">Grand Total: ₹{getTotal()}</h4>
                  <button 
                    className="btn px-4 py-2" 
                    style={{
                      backgroundColor: "#786670",
                      color: "black",
                      fontSize: "18px"
                    }}
                    onClick={handleCheckout}
                    disabled={isProcessing || cartItems.length === 0}
                  >
                    {isProcessing ? 'Processing...' : 'Check Out'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCart;