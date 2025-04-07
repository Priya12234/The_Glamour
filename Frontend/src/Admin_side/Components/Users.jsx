import { useState, useEffect } from "react";
import { FaCalendarAlt, FaShoppingBag, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${className}`}
      style={{
        backgroundColor: "#A5909C",
        color: "black",
        border: "none",
        fontFamily: "'Kaisei HarunoUmi'",
      }}
    >
      {children}
    </button>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);

  // ✅ Use fetch to get data from the backend
  useEffect(() => {
    // Updated fetchUsers function in your Users component
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/auth/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    // Updated handleDelete function
    const handleDelete = async (userId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/admin/users/${userId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete user");
        }

        // Update the UI by removing the deleted user
        setUsers(users.filter((user) => user.userid !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    fetchUsers();
  }, []);


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2 className="fw-bold">Users</h2>
        <Link to="/registerform">
          <Button>New User</Button>
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead style={{ backgroundColor: "#A5909C !important" }}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Orders</th>
              <th>Appointment</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.number}</td>
                <td>
                  <Link
                    to={`/userorders/${user.name}/${user.email}/${user.number}`}
                  >
                    <FaShoppingBag className="text-dark" />
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/userappointments/${user.name}/${user.email}/${user.number}`}
                  >
                    <FaCalendarAlt className="text-dark" />
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-link text-danger"
                    onClick={() => handleDelete()}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
