import { useState } from "react";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ backgroundColor: "#E0E0E0", fontFamily: "'Kaisei HarunoUmi'", paddingBottom: "30px" }}>
      <div className="row w-100">
        
        {/* Sidebar Space on Larger Screens */}
        <div className="col-md-3 d-none d-md-block"></div>

        {/* Centered Form with Larger Width */}
        <div className="col-12 col-md-6">
          {/* Title outside the form, aligned top-left */}
          <div className="p-4 w-100">
            <h2 className="mb-4 text-start">Edit Profile</h2>
          </div>

          <form onSubmit={handleSubmit} className="w-100 p-4 rounded shadow bg-white align-items-center" style={{ maxWidth: "450px" }}>
            
            <div className="mb-3">
              <label className="form-label fw-bold">Email:</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Name:</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Password:</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                className="form-control"
              />
            </div>

            <button 
              type="submit" 
              className="btn w-100 text-white" 
              style={{ backgroundColor: "#806575", fontSize: "18px", height: "50px" }}
            >
              Update
            </button>

          </form>
        </div>

        {/* Empty Column for Right Alignment on Larger Screens */}
        <div className="col-md-3 d-none d-md-block"></div>

      </div>
    </div>
  );
};

export default EditProfile;
