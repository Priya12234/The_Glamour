import React, { useState } from "react";
import { FaEdit, FaTrash, FaExpand } from "react-icons/fa";
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
  const [selectedService, setSelectedService] = useState(null);
  const [editService, setEditService] = useState(null);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    basicPrice: "",
    advancePrice: "",
    status: "Active",
    image: null,
  });
  const [showNewServiceModal, setShowNewServiceModal] = useState(false);

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

  // Open View Service Modal
  const viewService = (service) => {
    setSelectedService(service);
  };

  // Close Modal
  const closeModal = () => {
    setSelectedService(null);
  };

  // Open Edit Service Modal
  const openEditModal = (service) => {
    setEditService(service);
  };

  // Close Edit Modal
  const closeEditModal = () => {
    setEditService(null);
  };

  // Handle Input Change for Edit Modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditService({ ...editService, [name]: value });
  };

  // Update Service
  const updateService = () => {
    setServices(services.map((service) => (service.id === editService.id ? editService : service)));
    closeEditModal();
  };

  // Open New Service Modal
  const openNewServiceModal = () => {
    setShowNewServiceModal(true);
  };

  // Close New Service Modal
  const closeNewServiceModal = () => {
    setShowNewServiceModal(false);
    setNewService({
      name: "",
      description: "",
      basicPrice: "",
      advancePrice: "",
      status: "Active",
      image: null,
    });
  };

  // Handle Input Change for New Service Modal
  const handleNewServiceInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  // Handle Image Upload for New Service
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewService({ ...newService, image: URL.createObjectURL(file) });
    }
  };

  // Publish New Service
  const publishNewService = () => {
    const newId = services.length + 1; // Generate a new ID
    const newServiceData = {
      id: newId,
      name: newService.name,
      duration: "1 hr", // Default duration, can be modified
      price: newService.basicPrice,
      image: newService.image || Bride, // Default image if none is uploaded
      available: newService.status === "Active",
    };
    setServices([...services, newServiceData]);
    closeNewServiceModal();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Services</h4>
        <button className="btn btn-secondary" style={{backgroundColor: "#A5909C", color: "black", border: "none", fontFamily: "'Kaisei HarunoUmi'"}} onClick={openNewServiceModal}>New Service</button>
      </div>

      <div className="row">
        {services.map((service) => (
          <div key={service.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card text-center p-2 shadow-sm">
              <img src={service.image} alt={service.name} className="card-img-top" style={{ height: "200px", width: "95%", objectFit: "cover", borderRadius: "5px" }} />
              <div className="card-body p-2">
                <h6 className="fw-bold">{service.name}</h6>
                <p className="small text-muted">{service.duration}</p>
                <p className="fw-bold">{service.price}</p>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-success btn-sm" onClick={() => openEditModal(service)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteService(service.id)}>
                    <FaTrash />
                  </button>
                  <button className="btn btn-secondary btn-sm" onClick={() => viewService(service)}>
                    <FaExpand />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Service Modal */}
      {selectedService && (
        <div className="modal d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <h4>{selectedService.name}</h4>
              <img src={selectedService.image} alt={selectedService.name} className="img-fluid mb-3" style={{ borderRadius: "5px", maxHeight: "300px" }} />
              <p><strong>Duration:</strong> {selectedService.duration}</p>
              <p><strong>Price:</strong> {selectedService.price}</p>
              <p><strong>Status:</strong> {selectedService.available ? "Active" : "Inactive"}</p>
              <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-secondary" style={{backgroundColor: "#A5909C", color: "black", border: "none", fontFamily: "'Kaisei HarunoUmi'"}} onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {editService && (
        <div className="modal d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <h4>Edit Service</h4>
              <div className="mb-3">
                <label>Name:</label>
                <input type="text" name="name" value={editService.name} onChange={handleInputChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label>Duration:</label>
                <input type="text" name="duration" value={editService.duration} onChange={handleInputChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label>Price:</label>
                <input type="text" name="price" value={editService.price} onChange={handleInputChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label>Status:</label>
                <select name="available" value={editService.available} onChange={handleInputChange} className="form-control">
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Image:</label>
                <input type="file" name="image" onChange={handleInputChange} className="form-control" />
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-secondary me-2" style={{backgroundColor: "#A5909C", color: "black", border: "none", fontFamily: "'Kaisei HarunoUmi'"}} onClick={closeEditModal}>Close</button>
                <button className="btn btn-primary" style={{backgroundColor: "#A5909C", color: "black", border: "none", fontFamily: "'Kaisei HarunoUmi'"}} onClick={updateService}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Service Modal */}
      {showNewServiceModal && (
        <div className="modal d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <h4>New Service</h4>
              <div className="mb-3">
                <label>Name:</label>
                <input type="text" name="name" value={newService.name} onChange={handleNewServiceInputChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label>Description:</label>
                <input type="text" name="description" value={newService.description} onChange={handleNewServiceInputChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label>Basic Price:</label>
                <input type="text" name="basicPrice" value={newService.basicPrice} onChange={handleNewServiceInputChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label>Advance Price:</label>
                <input type="text" name="advancePrice" value={newService.advancePrice} onChange={handleNewServiceInputChange} className="form-control" />
              </div>
              <div className="mb-3">
                <label>Status:</label>
                <select name="status" value={newService.status} onChange={handleNewServiceInputChange} className="form-control">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Image:</label>
                <input type="file" name="image" onChange={handleImageUpload} className="form-control" />
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button className="btn btn-secondary me-2" style={{backgroundColor: "#A5909C", color: "black", border: "none", fontFamily: "'Kaisei HarunoUmi'"}}  onClick={closeNewServiceModal}>Close</button>
                <button className="btn btn-primary" style={{backgroundColor: "#A5909C", color: "black", border: "none", fontFamily: "'Kaisei HarunoUmi'"}} onClick={publishNewService}>Publish</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;