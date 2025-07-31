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
import Home from "./pages/Home";
import Wanted from "./pages/Wanted";
import ForSale from "./pages/ForSale";
import Checkout from "./components/Checkout";
import AboutUs from "./pages/Aboutus";
import Electronics from "./components/Electronics";
import Houses from "./components/Houses";
import Clothes from "./components/Clothes";
import Cars from "./components/Cars";
import BuyersForm from "./components/BuyersForm";
import SellersForm from "./pages/SellersForm";
import Logout from "./components/Logout";
import Profile from "./pages/Profile"
import Addresses from "./pages/Addresses";
import HelpCenter from "./categories/HelpCenter";
import ContactUs from "./categories/ContactUs";
import ShippingInfo from "./categories/ShippingInfo";
import Terms from "./categories/Terms";
import Privacy from "./categories/Privacy";
import Blog from "./categories/Blog";
import Language from "./categories/Language";
import ReturnsRefunds from "./categories/ReturnsRefunds";
import TrackOrder from "./categories/TrackOrder";
import PaymentMethods from "./categories/PaymentMethods";
import Orders from "./categories/Orders"
import Whishlist from "./categories/Whishlist";
import NewArrivals from "./categories/NewArrivals";
import BestSellers from "./categories/BestSellers";
import DealsAndOffers from "./categories/DealsandOffers";
import Brands from "./categories/Brands";
function App() {
  return (
    <Router>
      <Navbar />
      <Search />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/wanted" element={<Wanted />} />
        <Route path="/forsale" element={<ForSale />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addresses" element={<Addresses />} />
         <Route path="/helpcenter" element={<HelpCenter />} />
         <Route path="/contactus" element={< ContactUs/>} />
         <Route path="/shippinginfo" element={< ShippingInfo/>} />
         <Route path="/terms" element={< Terms/>} />
         <Route path="/privacy" element={< Privacy/>} />
         <Route path="/blog" element={< Blog/>} />
         <Route path="/language" element={< Language/>} />
         <Route path="/returns-refunds" element={< ReturnsRefunds/>} />
         <Route path="/trackorder" element={< TrackOrder/>} />
          <Route path="/paymentmethods" element={< PaymentMethods/>} />
          <Route path="/orders" element={< Orders/>} />
          <Route path="/whishlist" element={< Whishlist/>} />
          <Route path="/newarrivals" element={< NewArrivals/>} />
           <Route path="/best-sellers" element={< BestSellers/>} />
           <Route path="/dealsandoffers" element={< DealsAndOffers/>} />
           <Route path="/brands" element={< Brands/>} />
           
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
         <Route path="/electronics" element={<Electronics/>} />
         <Route path="/buyers-form" element={<BuyersForm />} />
         <Route path="/sellers-form" element={<SellersForm />} />
          <Route path="/houses" element={<Houses/>} />
           <Route path="/clothes" element={<Clothes/>} />
            <Route path="/cars" element={<Cars/>} />
        <Route path="/checkout" element={<Checkout />} /> {/* 👈 add this route */}
      </Routes>
      <Back/>
      <Footer />
    </Router>
  );
}
export default App;
