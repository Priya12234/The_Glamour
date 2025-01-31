import headlineImage from '../Assets/Images/Model_new.png'; // Adjust the path to your image
import '../Assets/css/headline_and_image.css'
function HeadlineImage() {
    return (
        <div className="container-fluid p-0 position-relative overflow-hidden" style={{ backgroundColor: "#E0E0E0" }}>
            {/* Headline and Image Section */}
            <div className="row align-items-center">
                {/* Left Column: Headline Text */}
                <div className="col-md-6 p-5">
                    <h1 className="display-2 fw-bold" style={{ fontFamily:"Kaisei HarunoUmi" }}>THE GLAMOUR</h1><br/>
                    <p className="lead align-items-center" style={{fontFamily:"Kaushan Script",fontSize: "3.2rem"}}>Crafting Elegance,<br/> One Look at a Time.</p>
                </div>

                {/* Right Column: Image */}
                <div className="col-md-6 p-0">
                    <img 
                        src={headlineImage} 
                        alt="Headline" 
                        className="img-fluid" // Makes the image responsive
                        style={{ 
                            width:"2000px",
                            position: "relative",
                            right:"0px"
                        }} 
                    />
                </div>
            </div>

            {/* Black Divider */}
            <div className="w-100 bg-black" style={{ height: "10px" }}></div>
        </div>
    );
}

export default HeadlineImage;