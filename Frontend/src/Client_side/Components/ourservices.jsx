import React from "react";
import NavigationBar from "../Components/Navbar.jsx";
import Footer from "../Components/footer.jsx";
import Bride from "../Assets/Images/Bride.jpg";
import Makeup from "../Assets/Images/Makeup.jpg";
import HairStyle from "../Assets/Images/Hairstyle1.jpg";
import Facial from "../Assets/Images/Facial.jpg";
import Nail from "../Assets/Images/Nail.png";
import Haircut from "../Assets/Images/Haircut.jpg";
import Spa from "../Assets/Images/Spa.jpg";
import Mehndi from "../Assets/Images/Mehndi.jpg";

const services = [  
  { title: "Bridal Makeup", description: "Enhance your beauty with our professional makeup services for your special day.", details: ["Flawless look for your special day - ₹15,000", "Full Bridal Package - ₹30,000"], img: Bride },
  { title: "Occasional Makeup", description: "Enhance your beauty with expert makeup services, perfect for parties, festive celebrations, or formal gatherings.", details: ["Flawless Look for Your Event: ₹6,000"], img: Makeup },
  { title: "Hairstyle", description: "Transform your look with expert hairstyling services, designed for any event.", details: ["Elegant Hairstyle for Your Event: ₹1,000"], img: HairStyle },
  { title: "Facial", description: "Rejuvenate your skin with our professional facial services, designed to refresh and revitalize your complexion.", details: ["Basic Facial - ₹2,500", "Deep Cleanse Facial - ₹4,000"], img: Facial },
  { title: "Nail Art", description: "Transform your nails into a work of art with our creative and stylish nail designs.", details: ["Basic Nail Art - ₹1,500", "Advanced Nail Art - ₹3,000"], img: Nail },
  { title: "Haircut", description: "Refresh your look with our professional haircut services, tailored to suit your style and personality.", details: ["Basic Haircut - ₹1,500", "Advanced Haircut - ₹3,000"], img: Haircut },
  { title: "Spa", description: "Relax and rejuvenate with our luxurious spa treatments, designed to pamper you and relieve stress.", details: ["Basic Spa Treatment - ₹1,500", "Full Body Spa Treatment - ₹3,000"], img: Spa },
  { title: "Mehndi", description: "Adorn your hands and feet with beautiful, intricate mehndi designs, perfect for any special occasion.", details: ["Basic Mehndi - ₹1,500", "Intricate Mehndi - ₹3,000"], img: Mehndi }
];

function OurServices() {
  return (
    <>
      <NavigationBar />
      <div className="container-fluid p-5" style={{ backgroundColor: "#D3D3D3" }}>
        <div className="container p-4" style={{ backgroundColor: "#4C394E", color: "#DAC2D0", borderRadius: "10px", fontFamily: "'Kaisei HarunoUmi'", width: "70%" }}>
          <h2 className="text-center fw-bold mb-4">Our Services</h2>
          {services.map((service, index) => (
            <div key={index}>
              <div className="d-flex align-items-center mb-4">
                <img src={service.img} alt={service.title} className="rounded me-3" style={{ width: "100px", height: "100px" }} />
                <div>
                  <h5 className="fw-bold">{service.title}:</h5>
                  <p className="mb-1">{service.description}</p>
                  {service.details.map((detail, i) => (
                    <p key={i} className="mb-1 fw-bold">{detail}</p>
                  ))}
                </div>
              </div>
              {index !== services.length - 1 && <hr style={{ borderTop: "1px solid #DAC2D0" }} />} {/* Divider */}
            </div>
          ))}
          <div className="text-center mt-4">
            <button className="btn" style={{ backgroundColor: "#786670", color: "#DAC2D0", fontFamily: "'Kaisei HarunoUmi'", padding: "10px 20px" ,position:"relative",left:"40%"}}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OurServices;
