import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate for back functionality
import Sidebar from "../Components/Sidebar"; // Import Sidebar
import { FaArrowLeft } from "react-icons/fa"; // Import the back icon from react-icons

const MyProfile = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleBackClick = () => {
    navigate("/"); // Navigate back to the previous page
  };

  return (
    <div className="container-fluid position-relative">
      {/* Back Button with FaArrowLeft Icon */}
      <FaArrowLeft
        className="back-arrow"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "24px",
          color: "#35262E", // Same color as in the login form
          cursor: "pointer"
        }}
        onClick={handleBackClick} // Navigate back to the previous page
      />

      <div className="row" style={{ minHeight: "100%" }}>
        {/* Sidebar: Takes up 3 columns on medium and larger screens */}
        <div className="col-md-3 text-white py-5" style={{ backgroundColor: "#E0E0E0" }}>
          <Sidebar />
        </div>

        {/* Content Area: Takes remaining space */}
        <div className="col-md-9 p-3" style={{ minHeight: "100%" }}>
          <Outlet /> {/* Content will appear beside Sidebar */}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
