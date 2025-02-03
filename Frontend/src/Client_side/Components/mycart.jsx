import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
      <div className="container-fluid d-flex" style={{backgroundColor: "#E0E0E0"}}>
        {/* Sidebar */}
        <div className="sidebar p-4" style={{ width: "250px",minHeight: "100vh",fontFamily: "'Kaisei HarunoUmi'",fontSize:"20px",color: "#9F7E91" }}>
          <ul className="list-unstyled">
            <li className="mb-3"><a href="#" className="text-dark text-decoration-none">My Appointment</a></li><hr />
            <li className="mb-3"><a href="#" className="text-dark text-decoration-none">My Cart</a></li><hr />
            <li className="mb-3"><a href="#" className="text-dark text-decoration-none">Edit Profile</a></li><hr />
          </ul>
        </div>

        {/* Cart Content */}
        <div className="flex-grow-1 p-4" style={{fontFamily: "'Kaisei HarunoUmi'",fontSize:"20px" }}>
          <h2 className="mb-4">My Cart</h2>
          <table className="table">
          <thead  style={{ backgroundColor: "#E0E0E0" }}>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Cancel Order</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody  style={{ backgroundColor: "#E0E0E0" }}>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td className="d-flex align-items-center">
                    <img src={item.image} alt={item.name} width="50" className="me-3" />
                    {item.name} <br /> <small>{item.size}</small>
                  </td>
                  <td>₹{item.price}</td>
                  <td>
                    <button className="btn btn-outline-secondary me-2" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    {item.quantity}
                    <button className="btn btn-outline-secondary ms-2" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </td>
                  <td>
                    <button className="btn btn-danger px-3" onClick={() => handleCancel(item.id)}>Cancel</button>
                  </td>
                  <td>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Grand Total */}
          <div className="d-flex justify-content-between align-items-center mt-4" style={{fontFamily: "'Kaisei HarunoUmi'"}} >
            <h4>Grand Total: ₹{getTotal()}</h4>
            <button className="btn" style={{
              backgroundColor: "#786670",
              color: "black",
              fontFamily: "'Kaisei HarunoUmi'",
              padding: "10px 20px",
              fontSize: "20px"
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
