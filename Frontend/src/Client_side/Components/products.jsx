import { useState, useEffect } from "react";
import "../Assets/css/Products.css";

function Products() {
    const [modalShow, setModalShow] = useState(false);
    const [modalContent, setModalContent] = useState({
        product_image: "",
        product_name: "",
        product_weight: "",
        price: ""
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to chunk array into groups of 3
    const chunkArray = (array, chunkSize) => {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/products");
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleCardClick = (product) => {
        setModalContent({
            product_image: product.product_image,
            product_name: product.product_name,
            product_weight: product.product_weight,
            price: `MRP: ₹${product.price}`
        });
        setModalShow(true);
    };

    if (loading) {
        return <div className="text-center py-5">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center py-5 text-danger">Error: {error}</div>;
    }

    // Chunk products into groups of 3
    const productChunks = chunkArray(products, 3);

    return (
        <>
            <div id="products" className="services-container text-center py-5">
                <h2 className="services-title display-4 font-weight-bold mb-4">Our Products</h2>

                <div id="productsCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {productChunks.map((chunk, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <div className="d-flex justify-content-center align-items-center flex-wrap card-container py-3">
                                    {chunk.map((product, productIndex) => (
                                        <div key={productIndex} className="card card-custom" onClick={() => handleCardClick(product)}>
                                            <img 
                                                src={`http://localhost:3000/api/products/${product.product_image}`} 
                                                className="card-img-top card-img-custom" 
                                                alt={product.product_name} 
                                            />
                                            <div className="card-body d-flex flex-column justify-content-between">
                                                <h3 className="card-title">{product.product_name}</h3>
                                                <p className="card-text card-text-custom">
                                                    {product.product_name}<br></br>
                                                    {product.product_weight} <br></br>
                                                    MRP: ₹{product.price}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
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
                            <img 
                                src={`http://localhost:3000/api/products/${modalContent.product_image}`} 
                                alt={modalContent.product_name} 
                                className="img-fluid me-3" 
                                style={{ width: '250px', height: '250px' }} 
                            />
                            <div>
                                <h3 className="modal-title" id="productModalLabel">{modalContent.product_name}</h3>
                                <h5>{modalContent.product_weight}</h5>
                                <h6>{modalContent.price}</h6>
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