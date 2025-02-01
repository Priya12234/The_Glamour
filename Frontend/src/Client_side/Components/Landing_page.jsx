import NavigationBar from "../Components/Navbar.jsx";
import BenifitComponent from "./benefit_component.jsx";
import Footer from "./footer.jsx";
import HeadlineImage from "./headline_and_image.jsx";
import Services from "./services.jsx";
import Team from "./ourteam.jsx";
import FeedbackForm from "./feedback.jsx"
function LandingPage() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <HeadlineImage></HeadlineImage>
      <Services></Services>
      <BenifitComponent></BenifitComponent>
      <Team></Team>
      <FeedbackForm></FeedbackForm>
      <Footer></Footer>    
      </>
  );
}

export default LandingPage;

