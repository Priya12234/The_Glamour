function FeedbackForm() {
  const reviews = [
    { description: "Amazing service! It was very good and excellent", author: "Isha Tank", date: "1 Jan 2024" },
    { description: "Loved the style and precision. Great experience!", author: "Rahul Mehta", date: "5 Feb 2024" },
    { description: "Great products and amazing results. Highly recommend!", author: "Neha Sharma", date: "12 Mar 2024" },
    { description: "Very relaxing and refreshing experience!", author: "Amit Verma", date: "20 Apr 2024" }
  ];

  return (
    <div id="feedback" className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#E0E0E0", fontFamily: "'Kaisei HarunoUmi'", fontSize: "small", padding: "20px", minHeight: "100vh" }}>
      <div className="container d-flex flex-column flex-md-row align-items-center" style={{ gap: "40px", width: "100%", maxWidth: "1200px" }}>
        {/* Feedback Form Section */}
        <div className="w-100 w-md-50 me-md-5" style={{ minHeight: "400px" }}>
          <h2 className="text-center mb-4 fw-bold" style={{ fontFamily: "'Kaisei HarunoUmi'" }}>
            We Value Your Feedback
          </h2>
          <form>
            <div className="mb-3">
              <label className="form-label fw-bold">Email:</label>
              <input type="email" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Name:</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Describe</label>
              <textarea className="form-control" rows="4" required></textarea>
            </div>
            <button type="submit" className="btn w-100" style={{ backgroundColor: "#786670", color: "black", fontFamily: "'Kaisei HarunoUmi'", padding: "10px 20px" }}>
              Submit
            </button>
          </form>
        </div>

        {/* Latest Reviews Section */}
        <div className="w-100 w-md-40" style={{ maxHeight: "500px", overflowY: "auto", minHeight: "400px" }}>
          <h3 className="fw-bold">Latest Reviews</h3>
          <div className="mt-3">
            {reviews.map((review, index) => (
              <div key={index} className="card mb-3 p-3" style={{ backgroundColor: "white", borderRadius: "10px" }}>
                <p className="fw-bold">{review.description}</p>
                <p className="fw-bold">{review.author}</p>
                <small>{review.date}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackForm;
