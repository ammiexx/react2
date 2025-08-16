// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUp,SignIn } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Search from "./components/Search"
import Back from "./components/Back";
import Footer from "./components/Footer";
import Signup from "./components/Signup"
import Login from "./components/Login";
import Home from "./pages/Home2";
import Wanted from "./pages/Wanted";
import ForSale from "./pages/ForSale";
import AboutUs from "./pages/Aboutus";
import Chat2 from "./pages/chat2";
import Category1 from "./pages/Category1";
import Logout from "./components/Logout";
import Profile from "./pages/Profile"
import HelpCenter from "./categories/HelpCenter";
import ContactUs from "./categories/ContactUs";
import Privacy from "./categories/Privacy";
import Language from "./categories/Language";
import Brands from "./categories/Brands";
import CustomerServices from "./categories/CustomerServices";


import TechnologyMethods from "./BusinessCategories/TechnologyMethods";
import Announcements from "./BusinessCategories/Announcements";
import RealHome from "./pages/RealHome";
import Electronicmaterial from "./pages/Electronicmaterials";
import CarHome from "./pages/CarHome";
import FoodHome from "./pages/FoodHome";
import ApplianceHome from "./pages/AppliaceHome";
import BeautyHome from "./pages/BeautyHome";
import WeddingHome from "./pages/WeddingHome";
import EntertainmentHome from "./pages/EntertainmentHome";
import TravelHome from "./pages/TravelHome";
import Daily from "./pages/DailyDiscounts";
import Week from "./pages/WeeklyDiscounts";
import Newp from "./pages/New";
import Upcomming from "./pages/Upcomming";



function App() {
  return (
    <Router>
      <Navbar />
      <Search />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/your-discounts" element={<Category1 />} />
        <Route path="/fashions" element={<Home/>} />
          <Route path="/homes" element={<RealHome/>} />
          <Route path="/electronic-materials" element={<Electronicmaterial/>} />
          <Route path="/car-brands" element={<CarHome/>} />
          <Route path="/food-and-beverages" element={<FoodHome/>} />
          <Route path="/home-appliances" element={<ApplianceHome/>} />
          <Route path="/health-and-beauties" element={<BeautyHome/>} />
          <Route path="/events-and-weddings" element={<WeddingHome/>} />
          <Route path="/entertainments" element={<EntertainmentHome/>} />
          <Route path="/travels" element={<TravelHome/>} />
          <Route path="/daily discounts" element={<Daily/>} />
          <Route path="/weekly discounts" element={<Week/>} />
          <Route path="/new offers" element={<Newp/>} />
          <Route path="/upcomming services" element={<Upcomming/>} />
        <Route path="/wanted" element={<Wanted />} />
        <Route path="/forsale" element={<ForSale />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
         <Route path="/helpcenter" element={<HelpCenter />} />
         <Route path="/contactus" element={< ContactUs/>} />
         <Route path="/privacy" element={< Privacy/>} />
         <Route path="/language" element={< Language/>} />
           <Route path="/brands" element={< Brands/>} />
           <Route path="/customerservices" element={< CustomerServices/>} />
            <Route path="/what u want?" element={< Chat2/>} />
             <Route path="/technologymethods" element={< TechnologyMethods/>} />
             <Route path="/new advantages" element={< Announcements/>} />
           
        <Route
          path="/signup"
          element={
            <SignUp
              path="/signup"
              routing="path"
              afterSignUpUrl="/home"
            />
          }
        />
        <Route path="/aboutus" element={<AboutUs/>} />
        
      </Routes>
      <Back/>
      <Footer />
    </Router>
  );
}
export default App;
