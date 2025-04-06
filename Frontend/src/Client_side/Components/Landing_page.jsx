import { Routes, Route, useLocation } from "react-router-dom";
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
import MyProfile from "./Myprofile.jsx";
import MyAppointments from "./Myappointments.jsx";
import MyCart from "./mycart.jsx";
import EditProfile from "./editprofile.jsx";

function Layout() {
  const location = useLocation();

  // Define paths where Navbar and Footer should not appear
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

  const shouldHideNavbarAndFooter = hideNavbarAndFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideNavbarAndFooter && <NavigationBar />}
      <Routes>
        <Route
          index
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
        <Route path="ourservice" element={<OurServices />} />
        <Route path="registerForm" element={<RegisterForm />} />
        <Route path="loginForm" element={<LoginForm />} />
        <Route path="appointment_form" element={<BookingForm />} />
        <Route path="profile" element={<MyProfile />}>
          <Route index element={<MyAppointments />} />
          <Route path="myappointment" element={<MyAppointments />} />
          <Route path="mycart" element={<MyCart />} />
          <Route path="editprofile" element={<EditProfile />} />
        </Route>
      </Routes>
      {!shouldHideNavbarAndFooter && <Footer />}
    </>
  );
}

export default function LandingPage() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
}