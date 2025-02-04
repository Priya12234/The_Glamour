import BroImage from "../Assets/Images/bro1.png";
import "../Assets/css/login.css";

const LoginForm = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row w-100">
        {/* Left Section: Illustration */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={BroImage} alt="Salon Illustration" className="img-fluid" />
        </div>

        {/* Right Section: Enlarged Login Form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="login-card shadow w-100 min-vh-75 p-4">
            <h2 className="text-center">Hello! Welcome Back</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input type="email" className="login-form-control" id="email" />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input type="text" className="login-form-control" id="name" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input type="password" className="login-form-control" id="password" />
              </div>

              <div className="login-text-center">
                <button type="submit" className="login-btn">
                  Login
                </button>
              </div>

              <p className="login-text-center mt-3">
                Dont have an account? <a href="/register">Register Yourself</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
