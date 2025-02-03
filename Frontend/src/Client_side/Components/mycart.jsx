import { useState } from "react";
import foundation from "../Assets/Images/foundation.png";
import lipstick from "../Assets/Images/lipstick.png";
import eyeshadow from "../Assets/Images/eyeshadow.png";
import NavigationBar from "../Components/Navbar.jsx";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Foundation", size: "100 ML", price: 300, quantity: 1, image: foundation },
    { id: 2, name: "Lipstick", size: "10 g", price: 300, quantity: 2, image: lipstick },
    { id: 3, name: "EyeShadow", size: "10 g", price: 300, quantity: 1, image: eyeshadow },
  ]);

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

  return (
    <>
      <NavigationBar />
      <div className="container-fluid d-flex flex-wrap" style={{ backgroundColor: "#E0E0E0" }}>
        
        {/* Sidebar */}
        <div className="d-none d-md-block sidebar p-4" style={{ width: "250px", minHeight: "100vh", fontFamily: "'Kaisei HarunoUmi'", fontSize: "20px", color: "#9F7E91" }}>
          <ul className="list-unstyled">
            <li className="mb-3"><a href="#" className="text-dark text-decoration-none">My Appointment</a></li><hr />
            <li className="mb-3"><a href="#" className="text-dark text-decoration-none">My Cart</a></li><hr />
            <li className="mb-3"><a href="#" className="text-dark text-decoration-none">Edit Profile</a></li><hr />
          </ul>
        </div>

        {/* Mobile Sidebar Button */}
        <div className="d-md-none w-100 text-center p-2">
          <button className="btn btn-dark" data-bs-toggle="collapse" data-bs-target="#mobileSidebar">
            Menu
          </button>
          <div id="mobileSidebar" className="collapse">
            <ul className="list-unstyled mt-3">
              <li className="mb-2"><a href="#" className="text-dark text-decoration-none">My Appointment</a></li>
              <li className="mb-2"><a href="#" className="text-dark text-decoration-none">My Cart</a></li>
              <li className="mb-2"><a href="#" className="text-dark text-decoration-none">Edit Profile</a></li>
            </ul>
          </div>
        </div>

        {/* Cart Content */}
        <div className="flex-grow-1 p-4">
          <h2 className="mb-4">My Cart</h2>

          {/* Table with Scroll on Small Screens */}
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
            <button className="btn px-4 py-2" style={{
              backgroundColor: "#786670",
              color: "black",
              fontSize: "18px"
            }}>
              Check Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
