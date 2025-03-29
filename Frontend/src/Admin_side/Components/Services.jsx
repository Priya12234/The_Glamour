import { useState } from "react";
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
  { 
    id: 1, 
    name: "Bridal Makeup", 
    price: "₹5000", 
    image: Bride, 
    available: false,
    description: "Complete bridal makeup package including base, eyes, lips, and contouring for your special day." 
  },
  { 
    id: 2, 
    name: "Occasional Makeup", 
    price: "₹3000", 
    image: Makeup, 
    available: true,
    description: "Perfect makeup for parties and special occasions with long-lasting formulas." 
  },
  { 
    id: 3, 
    name: "Hairstyle", 
    price: "₹2000", 
    image: Hairstyle, 
    available: true,
    description: "Professional hairstyling for any occasion, from elegant updos to flowing curls." 
  },
  { 
    id: 4, 
    name: "Facial", 
    price: "₹3500", 
    image: Facial, 
    available: true,
    description: "Rejuvenating facial treatment customized for your skin type and concerns." 
  },
  { 
    id: 5, 
    name: "Nail Art", 
    price: "₹1500", 
    image: Nail, 
    available: true,
    description: "Creative nail art designs using high-quality products for long-lasting wear." 
  },
  { 
    id: 6, 
    name: "Haircut", 
    price: "₹1000", 
    image: Haircut, 
    available: true,
    description: "Professional haircut and styling to suit your face shape and personal style." 
  },
  { 
    id: 7, 
    name: "Spa", 
    price: "₹1200", 
    image: Spa, 
    available: true,
    description: "Relaxing spa treatments including massage, exfoliation, and aromatherapy." 
  },
  { 
    id: 8, 
    name: "Mehndi", 
    price: "₹900", 
    image: Mehndi, 
    available: true,
    description: "Beautiful henna designs for hands and feet using natural, safe ingredients." 
  },
];

const Services = () => {
  const [services, setServices] = useState(initialServices);
  const [selectedService, setSelectedService] = useState(null);
  const [editService, setEditService] = useState(null);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
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
      price: "",
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
    const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
    const newServiceData = {
      id: newId,
      name: newService.name,
      price: newService.price,
      image: newService.image || Bride,
      available: newService.status === "Active",
      description: newService.description
    };
    setServices([...services, newServiceData]);
    closeNewServiceModal();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Services</h4>
        <button 
          className="btn btn-secondary" 
          style={{
            backgroundColor: "#A5909C", 
            color: "black", 
            border: "none", 
            fontFamily: "'Kaisei HarunoUmi'"
          }} 
          onClick={openNewServiceModal}
        >
          New Service
        </button>
      </div>

      <div className="row">
        {services.map((service) => (
          <div key={service.id} className="col-lg-3 col-md-4 col-sm-6 mb-3">
            <div className="card text-center p-2 shadow-sm">
              <img 
                src={service.image} 
                alt={service.name} 
                className="card-img-top" 
                style={{ 
                  height: "200px", 
                  width: "95%", 
                  objectFit: "cover", 
                  borderRadius: "5px",
                  margin: "0 auto"
                }} 
              />
              <div className="card-body p-2">
                <h6 className="fw-bold">{service.name}</h6>
                <p className="fw-bold">{service.price}</p>
                <p style={{ color: service.available ? 'green' : 'red', fontWeight: 'bold' }}>
                  {service.available ? 'Available' : 'Not Available'}
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <button 
                    className="btn btn-success btn-sm" 
                    onClick={() => openEditModal(service)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => deleteService(service.id)}
                  >
                    <FaTrash />
                  </button>
                  <button 
                    className="btn btn-info btn-sm" 
                    onClick={() => viewService(service)}
                  >
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
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>{selectedService.name}</h4>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeModal}
                ></button>
              </div>
              
              <div className="text-center mb-3">
                <img 
                  src={selectedService.image} 
                  alt={selectedService.name} 
                  className="img-fluid rounded"
                  style={{ maxHeight: '300px' }}
                />
              </div>
              
              <div className="mb-3">
                <p><strong>Price:</strong> {selectedService.price}</p>
                <p style={{ color: selectedService.available ? 'green' : 'red', fontWeight: 'bold' }}>
                  <strong>Status:</strong> {selectedService.available ? 'Available' : 'Not Available'}
                </p>
              </div>
              
              <div className="mb-3">
                <h5>Description:</h5>
                <p>{selectedService.description}</p>
              </div>
              
              <div className="d-flex justify-content-end">
                <button 
                  className="btn btn-secondary" 
                  style={{ 
                    backgroundColor: "#A5909C", 
                    color: "black", 
                    border: "none", 
                    fontFamily: "'Kaisei HarunoUmi'" 
                  }} 
                  onClick={closeModal}
                >
                  Close
                </button>
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
                <input 
                  type="text" 
                  name="name" 
                  value={editService.name} 
                  onChange={handleInputChange} 
                  className="form-control" 
                />
              </div>
              <div className="mb-3">
                <label>Price:</label>
                <input 
                  type="text" 
                  name="price" 
                  value={editService.price} 
                  onChange={handleInputChange} 
                  className="form-control" 
                />
              </div>
              <div className="mb-3">
                <label>Description:</label>
                <textarea 
                  name="description" 
                  value={editService.description} 
                  onChange={handleInputChange} 
                  className="form-control" 
                  rows="3"
                />
              </div>
              <div className="mb-3">
                <label>Status:</label>
                <select 
                  name="available" 
                  value={editService.available} 
                  onChange={handleInputChange} 
                  className="form-control"
                >
                  <option value={true}>Available</option>
                  <option value={false}>Not Available</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Image:</label>
                <input 
                  type="file" 
                  name="image" 
                  onChange={handleInputChange} 
                  className="form-control" 
                />
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button 
                  className="btn btn-secondary me-2" 
                  style={{
                    backgroundColor: "#A5909C", 
                    color: "black", 
                    border: "none", 
                    fontFamily: "'Kaisei HarunoUmi'"
                  }} 
                  onClick={closeEditModal}
                >
                  Close
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{
                    backgroundColor: "#A5909C", 
                    color: "black", 
                    border: "none", 
                    fontFamily: "'Kaisei HarunoUmi'"
                  }} 
                  onClick={updateService}
                >
                  Update
                </button>
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
                <input 
                  type="text" 
                  name="name" 
                  value={newService.name} 
                  onChange={handleNewServiceInputChange} 
                  className="form-control" 
                />
              </div>
              <div className="mb-3">
                <label>Price:</label>
                <input 
                  type="text" 
                  name="price" 
                  value={newService.price} 
                  onChange={handleNewServiceInputChange} 
                  className="form-control" 
                />
              </div>
              <div className="mb-3">
                <label>Description:</label>
                <textarea 
                  name="description" 
                  value={newService.description} 
                  onChange={handleNewServiceInputChange} 
                  className="form-control" 
                  rows="3"
                />
              </div>
              <div className="mb-3">
                <label>Status:</label>
                <select 
                  name="status" 
                  value={newService.status} 
                  onChange={handleNewServiceInputChange} 
                  className="form-control"
                >
                  <option value="Active">Available</option>
                  <option value="Inactive">Not Available</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Image:</label>
                <input 
                  type="file" 
                  name="image" 
                  onChange={handleImageUpload} 
                  className="form-control" 
                />
                {newService.image && (
                  <div className="mt-2">
                    <img 
                      src={newService.image} 
                      alt="Preview" 
                      className="img-thumbnail" 
                      style={{ maxHeight: '100px' }}
                    />
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button 
                  className="btn btn-secondary me-2" 
                  style={{
                    backgroundColor: "#A5909C", 
                    color: "black", 
                    border: "none", 
                    fontFamily: "'Kaisei HarunoUmi'"
                  }} 
                  onClick={closeNewServiceModal}
                >
                  Close
                </button>
                <button 
                  className="btn btn-primary" 
                  style={{
                    backgroundColor: "#A5909C", 
                    color: "black", 
                    border: "none", 
                    fontFamily: "'Kaisei HarunoUmi'"
                  }} 
                  onClick={publishNewService}
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;