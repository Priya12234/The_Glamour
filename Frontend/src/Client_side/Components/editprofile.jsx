import  { useState } from "react";

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
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#E0E0E0" , fontFamily: "'Kaisei HarunoUmi'"}}>
      {/* Centered Form */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center",right:"70px" ,position:"relative",bottom:"70px"}}>
        <form onSubmit={handleSubmit} style={{ width: "400px", textAlign: "left" }}>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "18px", color: "#9F7E91", fontWeight: "bold" }}>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="form-control"
              style={{ height: "40px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "18px", color: "#9F7E91", fontWeight: "bold" }}>Name:</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="form-control"
              style={{ height: "40px" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "18px", color: "#9F7E91", fontWeight: "bold" }}>Password:</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="form-control"
              style={{ height: "40px" }}
            />
          </div>

          <button 
            type="submit" 
            className="btn w-100" 
            style={{ backgroundColor: "#806575", color: "#F5CADE", fontSize: "18px", height: "50px" }}
          >
            Update
          </button>

        </form>
      </div>

    </div>
  );
};

export default EditProfile;
