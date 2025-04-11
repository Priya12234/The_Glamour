import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ 
    product_name: "", 
    product_weight: "", 
    price: "", 
    product_image: null,
    imageFile: null
  });
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to fetch products`);
        }

        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
        console.error('Fetch products error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (product) => {
    setEditProduct({ ...product });
  };

  const handleNewProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    try {
      // Basic validation
      if (!newProduct.product_name.trim()) {
        throw new Error('Product name is required');
      }
      if (!newProduct.price || isNaN(newProduct.price)) {
        throw new Error('Please enter a valid price');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_name: newProduct.product_name,
          product_weight: newProduct.product_weight,
          price: newProduct.price
        })
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add product');
      }

      setProducts([...products, data.product]);
      setNewProduct({ 
        product_name: "", 
        product_weight: "", 
        price: "", 
        product_image: null,
        imageFile: null 
      });
      setShowNewProductModal(false);
      setError(null);
    } catch (err) {
      console.error('Add product error:', err);
      setError(err.message);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!editProduct?.productid) {
        throw new Error('No product selected for update');
      }
      if (!editProduct.product_name.trim()) {
        throw new Error('Product name is required');
      }
      if (!editProduct.price || isNaN(editProduct.price)) {
        throw new Error('Please enter a valid price');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(
        `http://localhost:3000/api/products/${editProduct.productid}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            product_name: editProduct.product_name,
            product_weight: editProduct.product_weight,
            price: editProduct.price
          })
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to update product');
      }

      setProducts(products.map(prod =>
        prod.productid === editProduct.productid ? data.product : prod
      ));
      setEditProduct(null);
      setError(null);
    } catch (err) {
      console.error('Update product error:', err);
      setError(err.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      if (!window.confirm('Are you sure you want to delete this product?')) {
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(
        `http://localhost:3000/api/products/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to delete product');
      }

      setProducts(products.filter(prod => prod.productid !== productId));
      setError(null);
    } catch (err) {
      console.error('Delete product error:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <div className="container-fluid p-4">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError(null)}
              aria-label="Close"
            ></button>
          </div>
        )}

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

        {products.length === 0 ? (
          <div className="alert alert-info">No products found. Add a new product to get started.</div>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product.productid} className="col-md-3 mb-4">
                <div className="card text-center p-2 shadow-sm">
                  <img 
                    src={product.product_image || 'https://via.placeholder.com/150'} 
                    alt={product.product_name} 
                    className="card-img-top mx-auto" 
                    style={{ 
                      height: "200px", 
                      width: "70%", 
                      objectFit: "cover", 
                      borderRadius: "5px" 
                    }} 
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                  <div className="card-body">
                    <h6>{product.product_name}</h6>
                    <p>{product.product_weight}</p>
                    <p className="fw-bold">MRP: ₹{product.price}</p>
                    <div className="d-flex justify-content-center gap-2">
                      <button 
                        className="btn btn-success btn-sm" 
                        onClick={() => handleEditClick(product)}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(product.productid)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Product Modal */}
        {editProduct && (
          <div className="modal d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-4">
                <h4>Edit Product</h4>
                
                <div className="mb-3 text-center">
                  <img 
                    src={editProduct.product_image || 'https://via.placeholder.com/150'} 
                    alt="Current Product" 
                    className="img-thumbnail mb-2 mx-auto" 
                    style={{ maxHeight: '150px' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Name:</label>
                  <input 
                    type="text" 
                    name="product_name" 
                    value={editProduct.product_name} 
                    onChange={handleInputChange} 
                    className="form-control" 
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Quantity (ml/gm):</label>
                  <input 
                    type="text" 
                    name="product_weight" 
                    value={editProduct.product_weight} 
                    onChange={handleInputChange} 
                    className="form-control" 
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Price:</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={editProduct.price} 
                    onChange={handleInputChange} 
                    className="form-control" 
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="d-flex justify-content-end mt-3 gap-2">
                  <button 
                    className="btn btn-secondary" 
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

        {/* New Product Modal */}
        {showNewProductModal && (
          <div className="modal d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content p-4">
                <h4>New Product</h4>
                
                <div className="mb-3">
                  <label className="form-label">Name:</label>
                  <input 
                    type="text" 
                    name="product_name" 
                    value={newProduct.product_name} 
                    onChange={handleNewProductInputChange} 
                    className="form-control" 
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Quantity (ml/gm):</label>
                  <input 
                    type="text" 
                    name="product_weight" 
                    value={newProduct.product_weight} 
                    onChange={handleNewProductInputChange} 
                    className="form-control" 
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Price:</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={newProduct.price} 
                    onChange={handleNewProductInputChange} 
                    className="form-control" 
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="d-flex justify-content-end mt-3 gap-2">
                  <button 
                    className="btn btn-secondary" 
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
                    disabled={!newProduct.product_name || !newProduct.price}
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