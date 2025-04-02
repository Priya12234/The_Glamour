import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import foundation from "../Assets/Images/foundation.png";
import lipstick from "../Assets/Images/lipstick.png";
import eyeshadow from "../Assets/Images/eyeshadow.png";

const MyCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Foundation", size: "100 ML", price: 300, quantity: 1, image: foundation },
    { id: 2, name: "Lipstick", size: "10 g", price: 300, quantity: 2, image: lipstick },
    { id: 3, name: "EyeShadow", size: "10 g", price: 300, quantity: 1, image: eyeshadow },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantityChange = (id, amount) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    ));
  };

  const handleCancel = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
      // In a real app, you would call your backend API to create an order
      // For demo purposes, we'll simulate this with frontend-only code
      const options = {
        key: 'rzp_test_vsPKBYMOs5z55L', // Replace with your Razorpay key
        amount: getTotal() * 100, // Razorpay uses paise (1 INR = 100 paise)
        currency: 'INR',
        name: 'Beauty Products',
        description: 'Payment for beauty products',
        image: '', // Add your logo URL here
        order_id: '', // This comes from your backend in a real app
        handler: function(response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          console.log('Payment successful:', response);
          
          // Clear cart after successful payment
          setCartItems([]);
          
          // Navigate to landing page
          navigate('/ourservice');
        },
        prefill: {
          name: 'Customer Name', // You can get this from user input in a real app
          email: 'customer@example.com', // You can get this from user input in a real app
          contact: '8320050619' // You can get this from user input in a real app
        },
        notes: {
          address: 'Beauty Products Purchase',
          items: cartItems.map(item => `${item.name} (Qty: ${item.quantity})`).join(', ')
        },
        theme: {
          color: '#786670'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="container-fluid p-4" style={{ backgroundColor: "#E0E0E0", fontFamily: "'Kaisei HarunoUmi'" }}>
        {/* Cart Content */}
        <div className="row justify-content-center">
          {/* Cart Table */}
          <div className="col-12 col-md-10 col-lg-8">
            <h2 className="mb-4 text-center">My Cart</h2>
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
                        <div>{item.name} <br /> <small>{item.size}</small></div>
                      </td>
                      <td>₹{item.price}</td>
                      <td>
                        <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                        {item.quantity}
                        <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                      </td>
                      <td>
                        <button className="btn btn-danger btn-sm px-2" onClick={() => handleCancel(item.id)}>Cancel</button>
                      </td>
                      <td>₹{item.price * item.quantity}</td>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCart;