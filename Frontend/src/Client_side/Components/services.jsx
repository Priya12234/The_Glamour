import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Assets/css/Products.css";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data); // Changed from data.services to just data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Function to chunk the services array into groups of 3 for carousel slides
  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const serviceChunks = chunkArray(services, 3);

  if (loading) {
    return <div className="text-center py-5">Loading services...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error: {error}</div>;
  }

  return (
    <>
      <div id="services" className="services-container text-center py-5">
        <h2 className="services-title display-4 font-weight-bold mb-4">What We Provide</h2>

        {services.length > 0 ? (
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {serviceChunks.map((chunk, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                  <div className="d-flex justify-content-center align-items-center flex-wrap card-container py-3">
                    {chunk.map((service) => (
                      <Link to="/ourservice" className="card card-custom text-decoration-none" key={service.serviceid}>
                        <img 
                          src={service.service_image || 'default-image-path.jpg'} 
                          className="card-img-top card-img-custom" 
                          alt={service.service_name} 
                        />
                        <div className="card-body d-flex flex-column justify-content-between">
                          <h3 className="card-title">{service.service_name}</h3>
                          <p className="card-text">{service.service_description}</p>
                          <p className="text-muted">Price: ${service.service_price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </a>
          </div>
        ) : (
          <div className="py-3">No services available at the moment.</div>
        )}

        {/* Book Appointment Button */}
        <div className="d-flex justify-content-start mt-4" style={{ paddingLeft: '200px' }}>
          <Link to="/appointment_form">
            <button className="btn book-appointment-btn-custom">Book Appointment</button>
          </Link>
        </div>
      </div>
      <div className="w-100 bg-dark" style={{ height: "10px" }}></div>
    </>
  );
}

export default Services;