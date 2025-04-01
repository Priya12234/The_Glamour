const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg px-4 py-3">
      <div className="container-fluid">
        {/* Title */}
        <a className="navbar-brand fw-bold fs-3" href="#">
          Welcome Admin 
        </a>

        {/* Navbar Collapse - Empty since we removed the account dropdown */}
        <div className="navbar-collapse collapse">
          <ul className="navbar-nav ms-auto">
            {/* Empty - no items here anymore */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;