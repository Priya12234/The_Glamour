import Makeup from '../Assets/Images/Makeup.jpg';
import Hairstyle1 from '../Assets/Images/Hairstyle1.jpg';
import Facial from '../Assets/Images/facial2.jpg';
import "../Assets/css/services.css"

function Services() {
  return (
    <>
    <div className="services-container text-center py-5">
      <h2 className="services-title display-4 font-weight-bold mb-4">What We Provide</h2>

      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* First Carousel Slide */}
          <div className="carousel-item active">
            <div className="d-flex justify-content-center align-items-center flex-wrap card-container py-3">
              <div className="card card-custom">
                <img src={Makeup} className="card-img-top card-img-custom" alt="Makeup" />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h3 className="card-title">Makeup</h3>
                  <p className="card-text">
                    Our talented team of professional makeup artists specializes in creating stunning looks for every occasion.
                  </p>
                </div>
              </div>
              <div className="card card-custom">
                <img src={Hairstyle1} className="card-img-top card-img-custom" alt="Hairstyle" />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h3 className="card-title">Hairstyle</h3>
                  <p className="card-text">
                    Our skilled hairstylists specialize in crafting beautiful, personalized looks for any occasion.
                  </p>
                </div>
              </div>
              <div className="card card-custom">
                <img src={Facial} className="card-img-top card-img-custom" alt="Facial" />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h3 className="card-title">Facial</h3>
                  <p className="card-text">
                    Experience rejuvenation with facials that cleanse, nourish, and bring out your skin natural radiance.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Second Carousel Slide */}
          <div className="carousel-item">
            <div className="d-flex justify-content-center align-items-center flex-wrap card-container py-3">
              <div className="card card-custom">
                <img src={Makeup} className="card-img-top card-img-custom" alt="Makeup" />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h3 className="card-title">Makeup</h3>
                  <p className="card-text">
                    Our talented team of professional makeup artists specializes in creating stunning looks for every occasion.
                  </p>
                </div>
              </div>
              <div className="card card-custom">
                <img src={Hairstyle1} className="card-img-top card-img-custom" alt="Hairstyle" />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h3 className="card-title">Hairstyle</h3>
                  <p className="card-text">
                    Our skilled hairstylists specialize in crafting beautiful, personalized looks for any occasion.
                  </p>
                </div>
              </div>
              <div className="card card-custom">
                <img src={Facial} className="card-img-top card-img-custom" alt="Facial" />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h3 className="card-title">Facial</h3>
                  <p className="card-text">
                    Experience rejuvenation with facials that cleanse, nourish, and bring out your skin natural radiance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev" >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden" >Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>

      {/* Book Appointment Button */}
      <div className="d-flex justify-content-start mt-4  pl-6" style={{ paddingLeft: '200px' }}>
        <button className="btn btn-primary book-appointment-btn-custom">Book Appointment</button>
      </div>
      <br></br>
      <br></br>
    </div>
    <div className="w-100 bg-dark" style={{ height: "10px" }}></div>
    </>
  );
}

export default Services;
