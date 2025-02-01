import SideImage from "../Assets/Images/download (5) 2.png";
import "../Assets/css/benefit_Component.css";

function BenefitComponent() {
    return (
        <>
        <div id="Benefit" style={{ backgroundColor: "#d3d3d3", padding: "70px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Centered Heading */}
            <h2 className="services-title display-4 font-weight-bold mb-4" style={{ textAlign: "center" }}>
                Benefits you will get
            </h2>

            <div className="benefit-content" style={{ maxWidth: "1000px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "70px" }}>
                {/* Text Section */}
                <div style={{ flex: 1 }}>
                    <p style={{ textAlign: "justify", fontSize: "20px", lineHeight: "1.6", fontFamily: "Kaisei HarunoUmi" }}>
                        Experience the convenience of booking salon appointments online, anytime and anywhere. Our easy-to-use booking system lets you select your desired services, choose a time slot that suits you, and receive instant confirmation—all without needing to call. Automated reminders help reduce no-shows, while our system ensures efficient management of staff schedules and resources.

                        Whether youre booking for yourself or a group, our platform is designed to enhance your salon experience, making it faster, more flexible, and personalized for your needs. Enjoy seamless scheduling, secure online payments, and exclusive discounts for members. Our advanced system also allows you to track past appointments, reschedule with ease, and receive tailored recommendations based on your preferences.
                    </p>
                    <button style={{ padding: "10px 20px", backgroundColor: "#6b5b6b", color: "white", border: "none", cursor: "pointer", fontFamily: "Kaisei HarunoUmi" }}>
                        Book Appointment
                    </button>
                </div>

                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                    <img
                        src={SideImage}
                        alt="Salon Service"
                        style={{ width: "100%", maxWidth: "400px"}}
                    />
                </div>
            </div>
        </div>
        <div className="w-100 bg-black" style={{ height: "10px" }}></div>
        </>
    );
}

export default BenefitComponent;
