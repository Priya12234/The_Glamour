import { useState, useEffect } from "react";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    number: "",
    password: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch('http://localhost:3000/api/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setFormData({
          email: userData.email || "",
          name: userData.name || "",
          number: userData.number || "",
          password: "" // Don't pre-fill password for security
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:3000/api/auth/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      alert("Profile updated successfully!");
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="container-fluid d-flex align-items-center justify-content-center" 
           style={{ backgroundColor: "#E0E0E0", fontFamily: "'Kaisei HarunoUmi'", height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid d-flex align-items-center justify-content-center" 
           style={{ backgroundColor: "#E0E0E0", fontFamily: "'Kaisei HarunoUmi'", height: "100vh" }}>
        <div className="alert alert-danger">
          Error: {error}. <a href="/login">Please login again</a>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" 
         style={{ backgroundColor: "#E0E0E0", fontFamily: "'Kaisei HarunoUmi'", paddingBottom: "30px", minHeight: "100vh" }}>
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
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            
            <div className="mb-3">
              <label className="form-label fw-bold">Email:</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                readOnly
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
              <label className="form-label fw-bold">Phone Number:</label>
              <input 
                type="text" 
                name="number" 
                value={formData.number} 
                onChange={handleChange} 
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">New Password (leave blank to keep current):</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Enter new password"
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