import { useState, useEffect } from "react";

// Simulate fetching user data
function fetchuserData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "RKU" });
    }, 3000); // Adjusted to 3 seconds for testing
  });
}

function UserComp1() {
  const [id, setId] = useState("loading....");
  const [name, setName] = useState("loading....");

  useEffect(() => {
    // Fetch user data and update state
    const fetchData = async () => {
      const user = await fetchuserData();
      setId(user.id);
      setName(user.name);
    };

    fetchData();

    // Cleanup function (if any async abort logic is required)
    return () => {
      // Add any necessary cleanup code here (not strictly needed for this example)
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      Id: {id} <br />
      Name: {name}
    </div>
  );
}

export default UserComp1;