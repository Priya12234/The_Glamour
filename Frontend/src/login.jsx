import React from "react";
import BroImage from "./assets/bro.png"; // Adjust the path based on your file location
import "./css/login.css";

const LoginForm = () => {
  return (
    <div className="container">
      {/* Left Section: Illustration */}
      <div className="left-section">
        <img
          src={BroImage} // Replace with your image URL
          alt="Salon Illustration"
        />
      </div>

      {/* Right Section: Registration Form */}
      <div className="right-section">
        <form>
        <h2 className="text-2xl font-kaisei text-purple-600">Hello! Welcome Back</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
            />
          </div>

          <button type="submit">Login</button>
        

        <p>
          Don't have an account? <a href="/login">Register Yourself</a>
        </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
