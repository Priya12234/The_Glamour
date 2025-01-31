import '../Assets/css/services.css';
import Makeup from '../Assets/Images/Makeup.jpg';
import Hairstyle1 from '../Assets/Images/Hairstyle1.jpg';
import Facial from '../Assets/Images/facial2.jpg';

function Services() {
    return (
        <>
            <div className="services-container">
                <h2 className="services-title">What We Provide</h2>

                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {/* First Carousel Slide */}
                        <div className="carousel-item active">
                            <div className="cards-wrapper">
                                <div className="card">
                                    <img src={Makeup} className="card-img-top" alt="Makeup" />
                                    <div className="card-body">
                                        <h3 className="card-title">Makeup</h3>
                                        <p className="card-description">
                                            Our talented team of professional makeup artists specializes in creating stunning looks for every occasion.
                                        </p>
                                    </div>
                                </div>
                                <div className="card">
                                    <img src={Hairstyle1} className="card-img-top" alt="Hairstyle" />
                                    <div className="card-body">
                                        <h3 className="card-title">Hairstyle</h3>
                                        <p className="card-description">
                                            Our skilled hairstylists specialize in crafting beautiful, personalized looks for any occasion.
                                        </p>
                                    </div>
                                </div>
                                <div className="card">
                                    <img src={Facial} className="card-img-top" alt="Facial" />
                                    <div className="card-body">
                                        <h3 className="card-title">Facial</h3>
                                        <p className="card-description">
                                            Experience rejuvenation with facials that cleanse, nourish, and bring out your skin natural radiance.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* second Carousle slide*/}
                        <div className="carousel-item">
                            <div className="cards-wrapper">
                                <div className="card">
                                    <img src={Makeup} className="card-img-top" alt="Makeup" />
                                    <div className="card-body">
                                        <h3 className="card-title">Makeup</h3>
                                        <p className="card-description">
                                            Our talented team of professional makeup artists specializes in creating stunning looks for every occasion.
                                        </p>
                                    </div>
                                </div>
                                <div className="card">
                                    <img src={Hairstyle1} className="card-img-top" alt="Hairstyle" />
                                    <div className="card-body">
                                        <h3 className="card-title">Hairstyle</h3>
                                        <p className="card-description">
                                            Our skilled hairstylists specialize in crafting beautiful, personalized looks for any occasion.
                                        </p>
                                    </div>
                                </div>
                                <div className="card">
                                    <img src={Facial} className="card-img-top" alt="Facial" />
                                    <div className="card-body">
                                        <h3 className="card-title">Facial</h3>
                                        <p className="card-description">
                                            Experience rejuvenation with facials that cleanse, nourish, and bring out your skin natural radiance.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Carousel Controls */}
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                        <span className="carousel-control-icon">&#10094;</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                        <span className="carousel-control-icon">&#10095;</span>
                    </a>
                </div>

                {/* Book Appointment Button */}
                <div className="appointment-btn-container">
                    <button className="book-appointment-btn">Book Appointment</button>
                </div>
                <br></br>
                <br></br>

            </div>
            <div className="w-100 bg-black" style={{ height: "10px" }}></div>
        </>
    );
}

export default Services;
