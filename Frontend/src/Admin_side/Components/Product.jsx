import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Eyeliner from "../Assets/image/Eyeliner.jpg";
import Eyeshadow from "../Assets/image/eyeshadow.png";
import Foundation from "../Assets/image/foundation.png";
import lipglosses from "../Assets/image/lipglosses.jpg";
import Lipstick from "../Assets/image/lipstick.png";
import Mehndi from "../Assets/image/Mehndi.jpg";
import Nail from "../Assets/image/Nail.png";
import Primer from "../Assets/image/Primer.jpg";

const productsData = [
  { name: "Foundation", volume: "100ml", price: "300/-", image: Foundation },
  { name: "Lipstick", volume: "50ml", price: "250/-", image: Lipstick },
  { name: "EyeShadow", volume: "100ml", price: "300/-", image: Eyeshadow },
  { name: "lipglosses", volume: "100ml", price: "300/-", image: lipglosses },
  { name: "Primer", volume: "100ml", price: "300/-", image: Primer },
  { name: "Eyeliner", volume: "100ml", price: "300/-", image: Eyeliner },
  { name: "Mehndi", volume: "100ml", price: "300/-", image: Mehndi },
  { name: "Nail", volume: "100ml", price: "300/-", image: Nail },
];

const Product = () => {
  const [products, setProducts] = useState(productsData);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", volume: "", price: "", image: null });
  const [editProduct, setEditProduct] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleEditImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditProduct(prev => ({
        ...prev,
        newImage: e.target.files[0]
      }));
    }
  };

  const handleEditClick = (product) => {
    setEditProduct({
      ...product,
      newImage: null
    });
  };

  const handleNewProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewProduct(prev => ({ 
        ...prev, 
        image: URL.createObjectURL(e.target.files[0]),
        imageFile: e.target.files[0]
      }));
    }
  };

  const handleAddProduct = () => {
    setProducts([...products, newProduct]);
    setNewProduct({ name: "", volume: "", price: "", image: null });
    setShowNewProductModal(false);
  };

  const handleUpdate = () => {
    setProducts(prevProducts =>
      prevProducts.map(prod =>
        prod.name === editProduct.name 
          ? { 
              ...editProduct,
              image: editProduct.newImage ? URL.createObjectURL(editProduct.newImage) : editProduct.image
            } 
          : prod
      )
    );
    setEditProduct(null);
  };

  return (
    <div className="d-flex">
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Products</h4>
          <button 
            className="btn btn-secondary" 
            style={{ 
              backgroundColor: "#A5909C", 
              color: "black", 
              border: "none", 
              fontFamily: "'Kaisei HarunoUmi'" 
            }} 
            onClick={() => setShowNewProductModal(true)}
          >
            New Product
          </button>
        </div>

        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card text-center p-2 shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="card-img-top" 
                  style={{ 
                    height: "200px", 
                    width: "70%", 
                    objectFit: "cover", 
                    borderRadius: "5px" 
                  }} 
                />
                <div className="card-body">
                  <h6>{product.name}</h6>
                  <p>{product.volume}</p>
                  <p className="fw-bold">MRP: {product.price}</p>
                  <div className="d-flex justify-content-center gap-2">
                    <button 
                      className="btn btn-success btn-sm" 
                      onClick={() => handleEditClick(product)}
                    >
                      <FaEdit />
                    </button>
                    <button className="btn btn-danger btn-sm">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {editProduct && (
          <div className="modal d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-4">
                <h4>Edit Product</h4>
                
                <div className="mb-3 text-center">
                  <img 
                    src={editProduct.image} 
                    alt="Current Product" 
                    className="img-thumbnail mb-2" 
                    style={{ maxHeight: '150px' }}
                  />
                </div>
                
                <label>Name:</label>
                <input 
                  type="text" 
                  name="name" 
                  value={editProduct.name} 
                  onChange={handleInputChange} 
                  className="form-control" 
                />
                
                <label>Quantity (ml/gm):</label>
                <input 
                  type="text" 
                  name="volume" 
                  value={editProduct.volume} 
                  onChange={handleInputChange} 
                  className="form-control" 
                />
                
                <label>Price:</label>
                <input 
                  type="text" 
                  name="price" 
                  value={editProduct.price} 
                  onChange={handleInputChange} 
                  className="form-control" 
                />
                
                <label className="form-label">Change Image:</label>
                <div className="mb-3">
                  <label htmlFor="editProductImage" className="btn btn-outline-secondary w-100">
                    Choose New Image
                    <input 
                      type="file" 
                      id="editProductImage"
                      onChange={handleEditImageChange}
                      className="d-none"
                      accept="image/*"
                    />
                  </label>
                  {editProduct.newImage && (
                    <div className="mt-2 text-center">
                      <img 
                        src={typeof editProduct.newImage === 'string' ? 
                          editProduct.newImage : 
                          URL.createObjectURL(editProduct.newImage)} 
                        alt="New Preview" 
                        className="img-thumbnail" 
                        style={{ maxHeight: '100px' }}
                      />
                      <small className="d-block text-muted">New Image Preview</small>
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
                    onClick={() => setEditProduct(null)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary" 
                    style={{ 
                      backgroundColor: "#A5909C", 
                      color: "black", 
                      border: "none", 
                      fontFamily: "'Kaisei HarunoUmi'" 
                    }} 
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showNewProductModal && (
          <div className="modal d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-4">
                <h4>New Product</h4>
                <label>Name:</label>
                <input 
                  type="text" 
                  name="name" 
                  value={newProduct.name} 
                  onChange={handleNewProductInputChange} 
                  className="form-control" 
                />
                <label>Quantity (ml/gm):</label>
                <input 
                  type="text" 
                  name="volume" 
                  value={newProduct.volume} 
                  onChange={handleNewProductInputChange} 
                  className="form-control" 
                />
                <label>Price:</label>
                <input 
                  type="text" 
                  name="price" 
                  value={newProduct.price} 
                  onChange={handleNewProductInputChange} 
                  className="form-control" 
                />
                <label>Image:</label>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary w-100">
                    Choose Image
                    <input 
                      type="file" 
                      onChange={handleImageChange}
                      className="d-none"
                      accept="image/*"
                    />
                  </label>
                  {newProduct.image && (
                    <div className="mt-2 text-center">
                      <img 
                        src={newProduct.image} 
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
                    onClick={() => setShowNewProductModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary" 
                    style={{ 
                      backgroundColor: "#A5909C", 
                      color: "black", 
                      border: "none", 
                      fontFamily: "'Kaisei HarunoUmi'" 
                    }} 
                    onClick={handleAddProduct}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;