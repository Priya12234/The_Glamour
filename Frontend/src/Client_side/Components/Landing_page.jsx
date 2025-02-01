import NavigationBar from "../Components/Navbar.jsx";
import BenifitComponent from "./benefit_component.jsx";
import Footer from "./footer.jsx";
import HeadlineImage from "./headline_and_image.jsx";
import Services from "./services.jsx";
import Team from "./ourteam.jsx";
function LandingPage() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <HeadlineImage></HeadlineImage>
      <Services></Services>
      <BenifitComponent></BenifitComponent>
      <Team></Team>
      <Footer></Footer>    
      </>
  );
}

export default LandingPage;

//added comment to check that project is in github repo
//added another  comment to check