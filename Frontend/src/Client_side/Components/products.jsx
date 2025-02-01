import Foundation from "../Assets/Images/foundation.png";
import Lipstick from "../Assets/Images/lipstick.png";
import Eyeshadow from "../Assets/Images/eyeshadow.png";
import "../Assets/css/Products.css";

function Products() {
    return (
        <>
            <div id="products" className="services-container text-center py-5">
                <h2 className="services-title display-4 font-weight-bold mb-4">Our Products</h2>

                <div id="productsCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {/* First Carousel Slide */}
                        <div className="carousel-item active">
                            <div className="d-flex justify-content-center align-items-center flex-wrap card-container py-3">
                                <div className="card card-custom">
                                    <img src={Foundation} className="card-img-top card-img-custom" alt="Foundation" />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h3 className="card-title">Foundation</h3>
                                        <p className="card-text card-text-custom">
                                            Foundation<br></br>
                                            100ml <br></br>
                                            MRP: ₹300 
                                        </p>
                                    </div>
                                </div>
                                <div className="card card-custom">
                                    <img src={Lipstick} className="card-img-top card-img-custom" alt="Lipstick" />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h3 className="card-title">Lipstick</h3>
                                        <p className="card-text card-text-custom">
                                        Foundation<br></br>
                                            100ml <br></br>
                                            MRP: ₹300 
                                        </p>
                                    </div>
                                </div>
                                <div className="card card-custom">
                                    <img src={Eyeshadow} className="card-img-top card-img-custom" alt="Eyeshadow" />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h3 className="card-title">Eyeshadow</h3>
                                        <p className="card-text card-text-custom">
                                        Foundation<br></br>
                                            100ml <br></br>
                                            MRP: ₹300 
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Second Carousel Slide */}
                        <div className="carousel-item">
                            <div className="d-flex justify-content-center align-items-center flex-wrap card-container py-3">
                                <div className="card card-custom">
                                    <img src={Foundation} className="card-img-top card-img-custom" alt="Foundation" />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h3 className="card-title">Foundation</h3>
                                        <p className="card-text card-text-custom">
                                        Foundation<br></br>
                                            100ml <br></br>
                                            MRP: ₹300 
                                        </p>
                                    </div>
                                </div>
                                <div className="card card-custom">
                                    <img src={Lipstick} className="card-img-top card-img-custom" alt="Lipstick" />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h3 className="card-title">Lipstick</h3>
                                        <p className="card-text card-text-custom">
                                        Foundation<br></br>
                                            100ml <br></br>
                                            MRP: ₹300 
                                        </p>
                                    </div>
                                </div>
                                <div className="card card-custom">
                                    <img src={Eyeshadow} className="card-img-top card-img-custom" alt="Eyeshadow" />
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h3 className="card-title">Eyeshadow</h3>
                                        <p className="card-text card-text-custom">
                                        Foundation<br></br>
                                            100ml <br></br>
                                            MRP: ₹300 
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Carousel Controls */}
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#productsCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#productsCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <br />
                <br />
            </div>
            <div className="w-100 bg-dark" style={{ height: "10px" }}></div>
        </>
    )
}
export default Products;