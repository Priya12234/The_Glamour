import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar"; // Import Sidebar
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const MyProfile = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar: Takes up 3 columns on medium and larger screens */}
        <div className="col-md-3 text-white p-3" style={{backgroundColor:"#E0E0E0"}}>
          <Sidebar />
        </div>

        {/* Content Area: Takes remaining space */}
        <div className="col-md-9 p-3">
          <Outlet /> {/* Content will appear beside Sidebar */}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
