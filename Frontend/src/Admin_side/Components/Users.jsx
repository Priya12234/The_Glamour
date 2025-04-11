import { useState, useEffect } from "react";
import { FaCalendarAlt, FaShoppingBag, FaTrash, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Button = ({ children, onClick, className, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${className}`}
      style={{
        backgroundColor: "#A5909C",
        color: "black",
        border: "none",
        fontFamily: "'Kaisei HarunoUmi'",
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:3000/api/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to fetch users',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (!result.isConfirmed) return;
      const token = localStorage.getItem("token");
      // Add this debug line:
      console.log("Current token:", token);

      const response = await fetch(
        `http://localhost:3000/api/auth/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Add this if missing
          },
        }
      );

      // Add more detailed error logging
      console.log("Delete response status:", response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error(errorData.message || "Failed to delete user");
      } 

      setUsers(users.filter((user) => user.userid !== userId));
      Swal.fire(
        'Deleted!',
        'User has been deleted successfully.',
        'success'
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to delete user',
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-primary" onClick={fetchUsers}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Users Management</h2>
        <Link to="/admin/adminregisterform">
          <Button icon={FaPlus}>New User</Button>
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Phone</th>
                  <th className="text-center">Orders</th>
                  <th className="text-center">Appointments</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.userid}>
                      <td className="align-middle">{user.name}</td>
                      <td className="align-middle">{user.email}</td>
                      <td className="align-middle">{user.number || "N/A"}</td>
                      <td className="align-middle text-center">
                        <Link
                          to={`/admin/userorders/${user.userid}`}
                          className="btn btn-sm btn-outline-primary"
                          title="View Orders"
                        >
                          <FaShoppingBag />
                        </Link>
                      </td>
                      <td className="align-middle text-center">
                        <Link
                          to={`/admin/userappointments/${user.userid}`}
                          className="btn btn-sm btn-outline-secondary"
                          title="View Appointments"
                        >
                          <FaCalendarAlt />
                        </Link>
                      </td>
                      <td className="align-middle text-center">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(user.userid)}
                          title="Delete User"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;