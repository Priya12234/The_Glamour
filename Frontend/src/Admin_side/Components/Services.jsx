import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Eyeliner from "../Assets/image/Eyeliner.jpg";
import Eyeshadow from "../Assets/image/eyeshadow.png";
import Foundation from "../Assets/image/foundation.png";
import Lipglosses from "../Assets/image/lipglosses.jpg";
import Lipstick from "../Assets/image/lipstick.png";
import Primer from "../Assets/image/Primer.jpg";

const services = [
  { id: 1, name: "Bridal Makeup", duration: "2 hrs", price: "₹5000", image: Foundation },
  { id: 2, name: "Party Makeup", duration: "1.5 hrs", price: "₹3000", image: Lipstick },
  { id: 3, name: "Eye Makeup", duration: "1 hr", price: "₹2000", image: Eyeshadow },
  { id: 4, name: "Glossy Makeup", duration: "1.5 hrs", price: "₹3500", image: Lipglosses },
  { id: 5, name: "Primer Application", duration: "30 min", price: "₹1500", image: Primer },
  { id: 6, name: "Eyeliner Styling", duration: "45 min", price: "₹1000", image: Eyeliner },
];

const Services = () => {
  return (
    <div className="services-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Services</h4>
        <button className="btn btn-secondary">New Service</button>
      </div>

      <div className="row">
        {services.map((service) => (
          <div key={service.id} className="col-md-4 mb-4">
            <div className="card text-center p-2 shadow-sm">
            <img src={services.image} alt={services.name} className="card-img-top" style={{ height: "150px" }} />
              <div className="card-body">
                <h6>{service.name}</h6>
                <p>Duration: {service.duration}</p>
                <p className="fw-bold">Price: {service.price}</p>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-success btn-sm"><FaEdit /></button>
                  <button className="btn btn-danger btn-sm"><FaTrash /></button>
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
