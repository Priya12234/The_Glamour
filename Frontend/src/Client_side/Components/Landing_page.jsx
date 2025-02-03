import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "../Components/Navbar.jsx";
import BenifitComponent from "./benefit_component.jsx";
import Footer from "./footer.jsx";
import HeadlineImage from "./headline_and_image.jsx";
import Services from "./services.jsx";
import Team from "./ourteam.jsx";
import FeedbackForm from "./feedback.jsx";
import Products from "./products.jsx";
import OurServices from "./ourservices.jsx";
import RegisterForm from "./register.jsx";

function Layout() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/registerForm"; // Hide on register page

  return (
    <>
      {!hideNavbarAndFooter && <NavigationBar />}
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
        <Route path="/registerForm" element={<RegisterForm />} />
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

function LandingPage() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default LandingPage;
