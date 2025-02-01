
function FeedbackForm() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#D3D3D3",fontFamily: "'Kaisei HarunoUmi'",fontSize : "20px" }}>
      <div className="w-45">
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
          <button type="submit" className="btn w-100" style={{ backgroundColor: "#786670", color: "black" ,fontFamily: "'Kaisei HarunoUmi'",padding : "10px 20px"}}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
