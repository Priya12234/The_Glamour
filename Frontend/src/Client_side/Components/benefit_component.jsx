import SideImage from "../Assets/Images/download (5) 2.png";

function BenefitComponent() {
  return (
    <div style={{ backgroundColor: "#d3d3d3", padding: "40px", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "900px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        {/* Text Section */}
        <div style={{ flex: 1, order: 1 }}>
        <h2 className="services-title display-4 font-weight-bold mb-4">What We Provide</h2>             
          <p style={{ textAlign: "justify", fontSize: "16px", lineHeight: "1.6" }}>
            Experience the convenience of booking salon appointments online, anytime and anywhere. 
            Our easy-to-use booking system lets you select your desired services, choose a time slot that 
            suits you, and receive instant confirmation—all without needing to call. Automated reminders 
            help reduce no-shows, while our system ensures efficient management of staff schedules and resources. 
            Whether youre booking for yourself or a group, our platform is designed to enhance your salon experience, 
            making it faster, more flexible, and personalized for your needs.
          </p>
          <button style={{ padding: "10px 20px", backgroundColor: "#6f6363", color: "white", border: "none", cursor: "pointer" }}>
            Book Appointment
          </button>
        </div>

        {/* Image Section */}
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", order: 2 }}>
          <img 
            src={SideImage}
            alt="Salon Service" 
            style={{ width: "100%", maxWidth: "400px" }} 
          />
        </div>
      </div>
    </div>
  );
}

export default BenefitComponent;
