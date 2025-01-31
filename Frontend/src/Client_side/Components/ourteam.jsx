import React from 'react';
import "../Assets/Files/bootstrap.min.css";
import Person from '../Assets/Images/download (7) 4.png';

function Team() {
  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "#E0E0E0", fontFamily: "'Kaisei HarunoUmi', serif", minHeight: "100vh" }}>
      <h1 className="text-center mb-5 fw-bold">Our Team</h1>
      <div className="container">
        <div className="row g-5 justify-content-center text-center">
          {/* Team Member 1 */}
          <div className="col-md-4">
            <div className="d-flex flex-column align-items-center">
                <img src={Person} alt="Isha Tank" className="img-fluid rounded-circle" style={{ width: "150px", height: "150px" }} />
              
              <h5 className="mt-3 fw-bold">Isha Tank</h5>
              <p className="text-muted text-left ">
                Enhance your natural beauty with our professional Makeup Artist services. From subtle looks to bold transformations, we tailor each session to your unique style and occasion.
              </p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="col-md-4">
            <div className="d-flex flex-column align-items-center">
                <img src={Person} alt="Priya Chauhan" className="img-fluid rounded-circle" style={{ width: "150px", height: "150px" }} />
            
              <h5 className="mt-3 fw-bold">Priya Chauhan</h5>
              <p className="text-muted text-left">
                Refresh and rejuvenate your skin with our Facial Artist services. Customized facials designed to improve skin texture and leave you with a glowing, healthy complexion.
              </p>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="col-md-4">
            <div className="d-flex flex-column align-items-center">
                <img src={Person} alt="Drashti Chag" className="img-fluid rounded-circle" style={{ width: "150px", height: "150px" }} />
             
              <h5 className="mt-3 fw-bold">Drashti Chag</h5>
              <p className="text-muted text-left">
                Achieve the perfect look with our expert Hairstylist services. Whether it's a fresh cut, color, or special occasion style, we deliver precision and creativity for every hair type.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
