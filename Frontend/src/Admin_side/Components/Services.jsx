import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Bride from "../Assets/image/Bride.jpg";
import Facial from "../Assets/image/Facial.jpg";
import Haircut from "../Assets/image/Haircut.jpg";
import Hairstyle from "../Assets/image/Hairstyle1.jpg";
import Makeup from "../Assets/image/Makeup.jpg";
import Mehndi from "../Assets/image/Mehndi.jpg";
import Nail from "../Assets/image/Nail.png";
import Spa from "../Assets/image/Spa.jpg";

const initialServices = [
  { id: 1, name: "Bridal Makeup", duration: "2 hrs", price: "₹5000", image: Bride, available: true },
  { id: 2, name: "Occasional Makeup", duration: "1.5 hrs", price: "₹3000", image: Makeup, available: true },
  { id: 3, name: "Hairstyle", duration: "1 hr", price: "₹2000", image: Hairstyle, available: true },
  { id: 4, name: "Facial", duration: "1.5 hrs", price: "₹3500", image: Facial, available: true },
  { id: 5, name: "Nail Art", duration: "30 min", price: "₹1500", image: Nail, available: true },
  { id: 6, name: "Haircut", duration: "45 min", price: "₹1000", image: Haircut, available: true },
  { id: 7, name: "Spa", duration: "10 min", price: "₹1200", image: Spa, available: true },
  { id: 8, name: "Mehndi", duration: "38 min", price: "₹900", image: Mehndi, available: true },
];

const Services = () => {
  const [services, setServices] = useState(initialServices);

  // Delete Service
  const deleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };

  // Toggle Availability
  const toggleAvailability = (id) => {
    setServices(
      services.map((service) =>
        service.id === id ? { ...service, available: !service.available } : service
      )
    );
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Services</h4>
        <button className="btn btn-secondary">New Service</button>
      </div>

      <div className="row">
        {services.map(({ id, name, duration, price, image, available }) => (
          <div key={id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card text-center p-2 shadow-sm">
            <img src={image} alt={name} className="card-img-top" style={{ height: "200px", width: "95%", objectFit: "cover", borderRadius: "5px" }} />

              <div className="card-body p-2">
                <h6 className="fw-bold">{name}</h6>
                <p className="small text-muted">{duration}</p>
                <p className="fw-bold">{price}</p>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-success btn-sm">
                    <FaEdit />
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteService(id)}>
                    <FaTrash />
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => toggleAvailability(id)}>
                    {available ? "✅" : "❌"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
