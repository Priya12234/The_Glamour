import "./Files/bootstrap.min.css";
import "./css/Landing_page.css";

function LandingPage() {
  return (
    <>
      <header>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <nav className="navbar navbar-expand-lg custom-navbar">
          <div className="container-fluid">
            <div className="row w-100">
              <div className="col-4 col-md-2">
                <a className="navbar-brand" href="#">
                  <img src="./src/assets/logo-removebg-preview.png" alt="Logo" width="90" height="90" />
                </a>
              </div>
              <div className="col-8 col-md-10">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <a className="nav-link active" aria-current="page" href="#home">Home</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#services">Services</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#appointment">Appointment</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#products">Our Products</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="container overlapping-container2">
          <a className="nav-link-font" href="#Feedback">
            Feedback
          </a>
          <a className="nav-link-font" href="#Feedback">
            Our Team
          </a>
          <a className="nav-link-font-small" href="#login">
            Login
          </a>
          <a className="nav-link-font-small right-align" href="#login" style={{ float: "right" }}>
            Register
          </a>
        </div>
        <div className="container model1">
          <img src="./src/assets/model1.png" alt="Image" height="700px" />
        </div>
        <div className="container pink-circle-container-full">
        </div>
        <div className="container overlapping-container">
        </div>
        <div className="container end-container-half">
        </div>
      </header>

      <div className="headline">
        Crafting Elegance,<br />
        One Look at a Time.
      </div>
      <div className="container makeup-brush">
        <img src="makeup_brush.png" alt="Image" />
      </div>
      <div className="left-halfcircle">
      </div>
      <div className="divider">
      </div>
      <div className="services-heading">
        What we Provide
      </div>
      {/* cardCarousel */}
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="cards-wrapper">
              <div className="card">
                <img src="Makeup.jpg" className="card-img-top" alt="Card Image" />
                <div className="card-body">
                  <h2 className="card-title">Makeup1</h2>
                  <p className="card-discription">
                    This product is made with a high-quality, natural ingredients.
                  </p>
                </div>
              </div>
              <div className="card">
                <img src="Makeup.jpg" className="card-img-top" alt="Card Image" />
                <div className="card-body">
                  <h2 className="card-title">Makeup2</h2>
                  <p className="card-discription">
                    This product is made with a high-quality, natural ingredients.
                  </p>
                </div>
              </div>
              <div className="card">
                <img src="Makeup.jpg" className="card-img-top" alt="Card Image" />
                <div className="card-body">
                  <h2 className="card-title">Makeup3</h2>
                  <p className="card-discription">
                    This product is made with a high-quality, natural ingredients.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="cards-wrapper">
              <div className="card">
                <img src="Hairstyle1.jpg" className="card-img-top" alt="Card Image" />
                <div className="card-body">
                  <h2 className="card-title">Makeup4</h2>
                  <p className="card-discription">
                    This product is made with a high-quality, natural ingredients.
                  </p>
                </div>
              </div>
              <div className="card">
                <img src="Makeup.jpg" className="card-img-top" alt="Card Image" />
                <div className="card-body">
                  <h2 className="card-title">Makeup5</h2>
                  <p className="card-discription">
                    This product is made with a high-quality, natural ingredients.
                  </p>
                </div>
              </div>
              <div className="card">
                <img src="Makeup.jpg" className="card-img-top" alt="Card Image" />
                <div className="card-body">
                  <h2 className="card-title">Makeup6</h2>
                  <p className="card-discription">
                    This product is made with a high-quality, natural ingredients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
          <span className="visually-hidden">
            <i className="fas fa-arrow-left" style={{ color: '#9F7E9E', fontSize: '24px' }}></i>
          </span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
          <span className="visually-hidden">
            <i className="fa-solid fa-arrow-right" style={{ color: '#9F7E9E', fontSize: '24px' }}></i>
          </span>
        </a>
      </div>
      {/*End of cardCarousel */}
      <button className="Book-appointment-btn">
        <a href="#appointment">Book an appointment</a>
      </button>
      <div className="container right-halfcircle">
      </div>
      <div className="divider2">
      </div>
      <div className="container left-quarter-circle">
      </div>
      <div className="appointment-heading">
        Benifits You Will Get
      </div>
    </>
  );
}

export default LandingPage;

//added comment to check that project is in github repo
