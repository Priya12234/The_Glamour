import { useState } from "react";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, feedback: "Amazing", date: "10-2-2024", time: "10:30 AM", client: "Drashti chag" },
    { id: 2, feedback: "Excellent", date: "11-2-2024", time: "10:30 AM", client: "Priya Chauhan" },
    { id: 3, feedback: "Good job", date: "12-2-2024", time: "10:30 AM", client: "Priya Chauhan" },
    { id: 4, feedback: "Keep it up", date: "13-2-2024", time: "10:30 AM", client: "Isha Tank" },
  ]);

  const handleDelete = (id) => {
    setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
  };

  const handleDisplay = (feedback) => {
    alert(`Feedback: ${feedback.feedback}\nClient: ${feedback.client}\nDate: ${feedback.date}\nTime: ${feedback.time}`);
  };

  return (
    <main className="content px-3 py-4 bg-light">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold fs-4">Client Feedback</h3>
          <h5 className="text-muted">{new Date().toLocaleDateString()}</h5>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>SR NO</th>
                      <th>Feedback</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Client</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.length > 0 ? (
                      feedbacks.map((feedback, index) => (
                        <tr key={feedback.id}>
                          <td>{index + 1}</td>
                          <td>{feedback.feedback}</td>
                          <td>{feedback.date}</td>
                          <td>{feedback.time}</td>
                          <td>{feedback.client}</td>
                          <td>
                            <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(feedback.id)}>
                              Delete
                            </button>
                            <button className="btn btn-info btn-sm" onClick={() => handleDisplay(feedback)}>
                              Display
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center text-muted">
                          No feedback available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FeedbackPage;