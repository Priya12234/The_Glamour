import panaImage from "./assets/pana.png"; // Adjust the path based on your file location
import ".//css/register.css";

const RegisterForm = () => {
  return (
    <div className="container">
      {/* Left Section: Illustration */}
      <div className="left-section">
        <img
          src={panaImage} // Replace with your image URL
          alt="Salon Illustration"
        />
      </div>

      {/* Right Section: Registration Form */}
      <div className="right-section">
        <form>
        <h2 className="text-2xl font-kaisei text-purple-600">Register Yourself</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit">Register</button>
        

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
