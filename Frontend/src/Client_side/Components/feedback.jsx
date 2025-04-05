import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FeedbackForm() {
  const [formData, setFormData] = useState({ description: '' });
  const [displayedFeedback, setDisplayedFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    
    const fetchDisplayedFeedback = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/feedback/displayed');
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setDisplayedFeedback(data);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDisplayedFeedback();
  }, []);

  const handleChange = (e) => {
    setFormData({ description: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Please login to submit feedback');
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ feedback: formData.description })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }

      // Refresh displayed feedback
      const refreshResponse = await fetch('http://localhost:3000/api/feedback/displayed');
      if (refreshResponse.ok) {
        setDisplayedFeedback(await refreshResponse.json());
      }

      alert('Feedback submitted successfully!');
      setFormData({ description: '' });
    } catch (err) {
      console.error("Submission error:", err);
      alert(err.message || 'Error submitting feedback');
    }
  };

  return (
    <div id="feedback" className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#E0E0E0", fontFamily: "'Kaisei HarunoUmi'", fontSize: "small", padding: "20px", minHeight: "100vh" }}>
      <div className="container d-flex flex-column flex-md-row align-items-center" style={{ gap: "40px", width: "100%", maxWidth: "1200px" }}>
        
        {/* Feedback Form Section */}
        <div className="w-100 w-md-50 me-md-5" style={{ minHeight: "400px" }}>
          <h2 className="text-center mb-4 fw-bold" style={{ fontFamily: "'Kaisei HarunoUmi'" }}>
            We Value Your Feedback
          </h2>
          
          {!isAuthenticated ? (
            <div className="alert alert-info">
              Please <a href="/login" className="alert-link">login</a> to submit feedback
            </div>
          ) : null}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Your Feedback</label>
              <textarea 
                className="form-control" 
                rows="4" 
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                disabled={!isAuthenticated}
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn w-100" 
              style={{ backgroundColor: "#786670", color: "white", fontFamily: "'Kaisei HarunoUmi'", padding: "10px 20px" }}
              disabled={!isAuthenticated}
            >
              {isAuthenticated ? 'Submit' : 'Please Login'}
            </button>
          </form>
        </div>

        {/* Displayed Feedback Section */}
        <div className="w-100 w-md-40" style={{ maxHeight: "500px", overflowY: "auto", minHeight: "400px" }}>
          <h3 className="fw-bold mb-3">Latest Reviews</h3>
          
          {isLoading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-warning">
              {error}
              <button 
                className="btn btn-sm btn-outline-secondary ms-2"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : displayedFeedback.length === 0 ? (
            <div className="text-center py-4 text-muted">
              No reviews available yet
            </div>
          ) : (
            <div className="mt-3">
              {displayedFeedback.map((feedback, index) => (
                <div key={index} className="card mb-3 p-3" style={{ backgroundColor: "white", borderRadius: "10px" }}>
                  <p className="fw-bold mb-2">{feedback.feedback}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted small">{feedback.name}</span>
                    <span className="text-muted small">
                      {new Date(feedback.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedbackForm;