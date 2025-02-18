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
import LoginForm from "./login.jsx";
import BookingForm from "./appointment.jsx";
import MyProfile from "./myprofile.jsx";
import MyAppointments from "./Myappointments.jsx";
import MyCart from "./mycart.jsx";
import EditProfile from "./editprofile.jsx";

function Layout() {
  const location = useLocation();

  // Define an array of paths where Navbar and Footer should not appear
  const hideNavbarAndFooterPaths = [
    "/registerForm",
    "/loginForm",
    "/ourservice",
    "/appointment_form",
    "/profile",
    "/profile/myappointment",
    "/profile/mycart",
    "/profile/editprofile",
  ];

  // Check if the current path matches any of the paths in the hideNavbarAndFooterPaths array
  const shouldHideNavbarAndFooter = hideNavbarAndFooterPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {/* Conditionally render Navbar */}
      {!shouldHideNavbarAndFooter && <NavigationBar />}
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
        <Route path="/loginForm" element={<LoginForm />} />
        <Route path="/appointment_form" element={<BookingForm />} />

        {/* Profile Route with nested Routes */}
        <Route path="/profile" element={<MyProfile />}>
          <Route index element={<MyAppointments />} /> {/* Default route for MyAppointments */}
          <Route path="myappointment" element={<MyAppointments />} />
          <Route path="mycart" element={<MyCart />} />
          <Route path="editprofile" element={<EditProfile />} />
        </Route>
      </Routes>
      {/* Conditionally render Footer */}
      {!shouldHideNavbarAndFooter && <Footer />}
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
