import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      {/* <div className="sidebar">
      <ul>
        <li><Link to="myappointment">My Appointment</Link></li>
        <li><Link to="mycart">My Cart</Link></li>
        <li><Link to="editprofile">Edit Profile</Link></li>
      </ul>
    </div> */}
      {/* Sidebar */}
      <div className="d-none d-md-block p-4" style={{ width: "250px", fontFamily: "'Kaisei HarunoUmi'", fontSize: "20px", color: "#9F7E91" }}>
        <ul className="list-unstyled">
          <li className="mb-2"><Link className="text-dark text-decoration-none" to="myappointment">My Appointment</Link></li><hr />
          <li className="mb-2"><Link to="mycart" className="text-dark text-decoration-none">My Cart</Link></li><hr />
          <li className="mb-2"><Link className="text-dark text-decoration-none" to="editprofile">Edit Profile</Link></li><hr />
        </ul>
      </div>

      {/* Mobile Sidebar Button */}
      <div className="d-md-none w-100 text-center p-2">
        <button className="btn btn-dark" data-bs-toggle="collapse" data-bs-target="#mobileSidebar">
          Menu
        </button>
        <div id="mobileSidebar" className="collapse">
          <ul className="list-unstyled mt-3">
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
