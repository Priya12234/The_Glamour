import avatarImage from "../Assets/image/account.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg px-4 py-3">
      <div className="container-fluid">
        {/* Title */}
        <a className="navbar-brand fw-bold fs-3" href="#" >
          Welcome Admin 
        </a>

        {/* Navbar Collapse */}
        <div className="navbar-collapse collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              {/* Account Icon */}
              <a
                href="#"
                className="nav-icon d-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <img
                  src={avatarImage}
                  className="avatar img-fluid rounded-circle me-2"
                  alt="User Avatar"
                  style={{ width: "40px", height: "40px" }}
                />
                <span className="d-none d-md-inline text-dark">Account</span>
              </a>

              {/* Dropdown Menu */}
              <ul className="dropdown-menu dropdown-menu-end rounded shadow-sm">
                <li>
                  <a href="/profile" className="dropdown-item">
                    <i className="lni lni-user me-2"></i> Profile
                  </a>
                </li>
                <li>
                  <a href="/settings" className="dropdown-item">
                    <i className="lni lni-cog me-2"></i> Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a href="/logout" className="dropdown-item text-danger">
                    <i className="lni lni-exit me-2"></i> Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
