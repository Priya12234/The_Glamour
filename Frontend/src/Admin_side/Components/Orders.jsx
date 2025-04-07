import { FaCheck, FaClock } from "react-icons/fa";
  import lipglosses from "../Assets/image/lipglosses.jpg";
  import Lipstick from "../Assets/image/lipstick.png";
  import Primer from "../Assets/image/Primer.jpg";

const Orders = () => {
  // ... (previous state declarations remain the same)

  
  
  const orders = [
    {
      id: 1,
      name: "Priya Chauhan",
      number: "9999999999",
      product: "Lipglosses",
      quantity: 2,
      image: lipglosses,
      price: "300/-",
      totalPrice: "600/-",
      status: "Delivered",
    },
    {
      id: 2,
      name: "Priya Chauhan",
      number: "9999999999",
      product: "Lipstick",
      quantity: 2,
      image: Lipstick,
      price: "300/-",
      totalPrice: "600/-",
      status: "Pending",
    },
    {
      id: 3,
      name: "Priya Chauhan",
      number: "9999999999",
      product: "Primer",
      quantity: 2,
      image: Primer,
      price: "300/-",
      totalPrice: "600/-",
      status: "Pending",
    },
  ];
  // In your JSX, add a test button for debugging:
  return (
    <div className="p-4">
       <div className="d-flex">
      <div className="container p-4">

        <h4>Orders</h4>
        <table className="table table-bordered mt-3">
          <thead className="table-secondary">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Number</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.name}</td>
                <td>{order.number}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>
                  <img 
                    src={order.image} 
                    alt={order.product} 
                    className="product-img" 
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                  />
                </td>
                <td>{order.price}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.status === "Delivered" ? (
                    <>
                      Delivered <FaCheck className="text-success ms-2" />
                    </>
                  ) : (
                    <>
                      Pending <FaClock className="text-warning ms-2" />
                    </>
                  )}
                </td>
                <td>
                  <button className="btn btn-danger btn-sm">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
    </div>
  );
};

export default Orders;