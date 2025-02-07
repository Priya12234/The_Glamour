import  { useState } from "react";
import Foundation from "../Assets/Images/foundation.png";
import Lipstick from "../Assets/Images/lipstick.png";
import Eyeshadow from "../Assets/Images/eyeshadow.png";
import "../Assets/css/Products.css";

function Products() {
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState({
        image: "",
        title: "",
        subtitle: "",
        description: ""
    });

    const products = [
        {
            image: Foundation,
            title: "Foundation",
            subtitle: "100ml",
            description: "MRP: ₹300"
        },
        {
            image: Lipstick,
            title: "Lipstick",
            subtitle: "100ml",
            description: "MRP: ₹300"
        },
        {
            image: Eyeshadow,
            title: "Eyeshadow",
            subtitle: "100ml",
            description: "MRP: ₹300"
        }
    ];

    const handleCardClick = (product) => {
        setModalContent(product);
        setModalShow(true);
    };

    return (
        <>
            <div id="products" className="services-container text-center py-5">
                <h2 className="services-title display-4 font-weight-bold mb-4">Our Products</h2>

                <div id="productsCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {/* First Carousel Slide */}
                        <div className="carousel-item active">
                            <div className="d-flex justify-content-center align-items-center flex-wrap card-container py-3">
                                {products.map((product, index) => (
                                    <div key={index} className="card card-custom" onClick={() => handleCardClick(product)}>
                                        <img src={product.image} className="card-img-top card-img-custom" alt={product.title} />
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <h3 className="card-title">{product.title}</h3>
                                            <p className="card-text card-text-custom">
                                                {product.title}<br></br>
                                                {product.subtitle} <br></br>
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Second Carousel Slide */}
                        <div className="carousel-item">
                            <div className="d-flex justify-content-center align-items-center flex-wrap card-container py-3">
                                {products.map((product, index) => (
                                    <div key={index} className="card card-custom" onClick={() => handleCardClick(product)}>
                                        <img src={product.image} className="card-img-top card-img-custom" alt={product.title} />
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <h3 className="card-title">{product.title}</h3>
                                            <p className="card-text card-text-custom">
                                                {product.title}<br></br>
                                                {product.subtitle} <br></br>
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
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

            {/* Modal */}
            <div className={`modal fade ${modalShow ? 'show' : ''}`} id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true" style={{ display: modalShow ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" onClick={() => setModalShow(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex">
                            <img src={modalContent.image} alt={modalContent.title} className="img-fluid me-3" style={{ width: '250px', height: '250px' }} />
                            <div>
                            <h3 className="modal-title" id="productModalLabel">{modalContent.title}</h3>
                                <h5>{modalContent.subtitle}</h5>
                                <h6>{modalContent.description}</h6>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setModalShow(false)}>Close</button>
                            <button type="button" className="btn btn-primary" style={{backgroundColor:"#6b5b6b",border:"0"}}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Backdrop */}
            {modalShow && <div className="modal-backdrop fade show" onClick={() => setModalShow(false)}></div>}
        </>
    );
}

export default Products;
