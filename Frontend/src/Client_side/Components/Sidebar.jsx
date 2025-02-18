import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="d-none d-md-block p-3" style={{ width: "250px", fontFamily: "'Kaisei HarunoUmi'", fontSize: "20px", color: "#9F7E91" }}>
        <ul className="list-unstyled">
          <li className="mb-2"><Link className="text-dark text-decoration-none" to="myappointment">My Appointment</Link></li><hr />
          <li className="mb-2"><Link to="mycart" className="text-dark text-decoration-none">My Cart</Link></li><hr />
          <li className="mb-2"><Link className="text-dark text-decoration-none" to="editprofile">Edit Profile</Link></li><hr />
        </ul>
      </div>

      {/* Mobile Sidebar Button */}
      <div className="d-md-none w-100 text-center p-2">
        <button className="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#mobileSidebar" aria-expanded="false" aria-controls="mobileSidebar">
          Menu
        </button>
        <div id="mobileSidebar" className="collapse mt-3">
          <ul className="list-unstyled">
            <li className="mb-2"><Link className="text-dark text-decoration-none" to="myappointment">My Appointment</Link></li>
            <li className="mb-2"><Link to="mycart" className="text-dark text-decoration-none">My Cart</Link></li>
            <li className="mb-2"><Link className="text-dark text-decoration-none" to="editprofile">Edit Profile</Link></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
