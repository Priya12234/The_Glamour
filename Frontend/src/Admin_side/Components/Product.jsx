import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Eyeliner from "../Assets/image/Eyeliner.jpg";
import Eyeshadow from "../Assets/image/eyeshadow.png";
import Foundation from "../Assets/image/foundation.png";
import lipglosses from "../Assets/image/lipglosses.jpg";
import Lipstick from "../Assets/image/lipstick.png";
import Mehndi from "../Assets/image/Mehndi.jpg";
import Nail from "../Assets/image/Nail.png";
import Primer from "../Assets/image/Primer.jpg";


const products = [
  {
    name: "Foundation",
    volume: "100ml",
    price: "300/-",
    image: Foundation,
  },
  {
    name: "Lipstick",
    volume: "50ml",
    price: "250/-",
    image: Lipstick, // Correct path from public folder
  },


    {
      name: "EyeShadow",
      volume: "100ml",
      price: "300/-",
      image: Eyeshadow,
    },
    {
      name: "lipglosses",
      volume: "100ml",
      price: "300/-",
      image: lipglosses,
    },
    {
      name: "Primer",
      volume: "100ml",
      price: "300/-",
      image: Primer,
    },
    {
      name: "Eyeliner",
      volume: "100ml",
      price: "300/-",
      image: Eyeliner,
    },
  
    {
      name: "Mehndi",
      volume: "100ml",
      price: "300/-",
      image: Mehndi,
    },
    {
      name: "Nail",
      volume: "100ml",
      price: "300/-",
      image: Nail,
    },
  ];
  
  
const Product = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      
      
      {/* Main Content */}
      <div className="container-fluid p-4">
       
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Products</h4>
          <button className="btn btn-secondary">New Product</button>
        </div>
        
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card text-center p-2 shadow-sm">
              <img src={product.image} alt={product.name} className="card-img-top" style={{ height: "200px", width: "70%", objectFit: "cover", borderRadius: "5px" }} />
               
                <div className="card-body">
                  <h6>{product.name}</h6>
                  <p>{product.volume}</p>
                  <p className="fw-bold">MRP: {product.price}</p>
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
    </div>
  );
};

export default Product;