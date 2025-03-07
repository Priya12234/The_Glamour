import { useState } from "react";
import { FaShoppingBag, FaCalendarAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Button = ({ children, onClick, className }) => {
  return (
    <button onClick={onClick} className={`btn ${className}`} style={{ backgroundColor: "#A5909C", color: "black", border: "none" , fontFamily: "'Kaisei HarunoUmi'"}}>
      {children}
    </button>
  );
};

const Users = () => {
  const [users, setUsers] = useState([
    {
      name: "Priya Chauhan",
      email: "pchauhan862@rku.ac.in",
      number: "9999999999",
    },
    {
      name: "Priya Chauhan",
      email: "pchauhan862@rku.ac.in",
      number: "9999999999",
    },
    {
      name: "Priya Chauhan",
      email: "pchauhan862@rku.ac.in",
      number: "9999999999",
    },
    {
      name: "Priya Chauhan",
      email: "pchauhan862@rku.ac.in",
      number: "9999999999",
    },
    {
      name: "Priya Chauhan",
      email: "pchauhan862@rku.ac.in",
      number: "9999999999",
    },
  ]);

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2 className="fw-bold">Users</h2>
       <Link to="/registerform"> <Button>New User</Button></Link>
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
                  <Link to="/userorders"><FaShoppingBag className="text-dark" /></Link>
                </td>
                <td>
                  <FaCalendarAlt className="text-dark" />
                </td>
                <td>
                  <button className="btn btn-link text-danger" onClick={() => handleDelete(index)}>
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