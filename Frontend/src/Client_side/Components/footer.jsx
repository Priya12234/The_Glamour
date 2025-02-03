import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../Assets/Images/logo-removebg-preview.png"

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#786670", color: "black" }} className="py-5 px-4">
      <div className="container">
        <div className="row">
          {/* Logo and Vision */}
          <div className="col-md-3">
            <h2 className="h5">
              <img src={logo} alt="Logo" className="brand-logo-img" />
            </h2>
            <p className="small">
              Our vision is to provide convenience and help increase your sales business.
            </p>
            <div className="d-flex gap-2 mt-3">
              <div className="bg-secondary rounded-circle" style={{ width: "10px", height: "10px" }}></div>
              <div className="bg-secondary rounded-circle" style={{ width: "10px", height: "10px" }}></div>
              <div className="bg-secondary rounded-circle" style={{ width: "10px", height: "10px" }}></div>
            </div>
            <div className="d-flex gap-3 mt-3">
              <FaFacebookF className="bg-white text-dark p-1 rounded-circle" style={{ width: "24px", height: "24px" }} />
              <FaTwitter className="bg-white text-dark p-1 rounded-circle" style={{ width: "24px", height: "24px" }} />
              <FaInstagram className="bg-white text-dark p-1 rounded-circle" style={{ width: "24px", height: "24px" }} />
            </div>
          </div>

          {/* About Section */}
          <div className="col-md-3" style={{ marginTop: "45px" }}>
            <h5>About</h5>
            <ul className="list-unstyled small mt-2">
              <li>How it works</li>
              <li>Featured</li>
              <li>Partnership</li>
              <li>Business Relation</li>
            </ul>
          </div>

          {/* Community Section */}
          <div className="col-md-3" style={{ marginTop: "45px" }}>
            <h5>Community</h5>
            <ul className="list-unstyled small mt-2">
              <li>Events</li>
              <li>Blog</li>
              <li>Podcast</li>
              <li>Invite a friend</li>
            </ul>
          </div>

          {/* Socials Section */}
          <div className="col-md-3" style={{ marginTop: "45px" }}>
            <h5>Socials</h5>
            <ul className="list-unstyled small mt-2">
              <li>Discord</li>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Facebook</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 border-top pt-3 d-flex justify-content-between small">
          <p>&copy; 2025 The Glamour. All rights <strong>reserved</strong></p>
          <div className="d-flex gap-3">
            <p>Terms & Condition</p>
            <p>Privacy & Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
