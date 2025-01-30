import panaImage from "../Assets/Images/pana.png"; // Adjust the path based on your file location
import "../Assets/Files/bootstrap.min.css";
import "../Assets/css/register.css";

const RegisterForm = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row w-100">
        {/* Left Section: Illustration */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img src={panaImage} alt="Salon Illustration" className="img-fluid" />
        </div>

        {/* Right Section: Enlarged Registration Form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card shadow w-100 min-vh-75 p-4">
            <h2 className="text-center">Register Yourself</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input type="email" className="form-control" id="email" />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input type="text" className="form-control" id="name" />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input type="password" className="form-control" id="password" />
              </div>

              <div className="mb-3">
                <label htmlFor="confirm-password" className="form-label">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm-password"
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-custom">
                  Register
                </button>
              </div>

              <p className="text-center mt-3">
                Already have an account? <a href="/login">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
