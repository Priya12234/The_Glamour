import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import NavigationBar from "../Components/Navbar.jsx";
import BenifitComponent from "./benefit_component.jsx";
import Footer from "./footer.jsx";
import HeadlineImage from "./headline_and_image.jsx";
import Services from "./services.jsx";
import Team from "./ourteam.jsx";
import FeedbackForm from "./feedback.jsx"
import Products from "./products.jsx"
import OurServices from "./ourservices.jsx"
import LoginForm from "./login.jsx";
import RegisterForm from "./register.jsx";
function LandingPage() {
  return (
    <>
    <Router>
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeadlineImage />
              <Services />
              <BenifitComponent />
              <Products />
              <Team />
              <FeedbackForm />
            </>
          }
        />
        <Route path="/ourservice" element={<OurServices />} />
        <Route path="/loginForm" element={<LoginForm />} />
        <Route path="/registerForm" element={<RegisterForm />} />
      </Routes>
      <Footer />
      </Router>
    </>
  );
}

export default LandingPage;

