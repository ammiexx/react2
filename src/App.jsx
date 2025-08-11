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
import Checkout from "./components/Checkout";
import AboutUs from "./pages/Aboutus";
import Questions from "./pages/Chat2";
import Category1 from "./pages/Category1";
import Electronics from "./components/Electronics";
import Houses from "./components/Houses";
import Clothes from "./components/Clothes";
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
import DealsandOffers from "./categories/DealsandOffers";
import Brands from "./categories/Brands";
import CustomerServices from "./categories/CustomerServices";
import TodaysDeals from "./categories/TodaysDeals";
import CarBrands from "./BusinessCategories/CarBrands";
import Fashion from "./BusinessCategories/Fashion";
import RealEstate from "./BusinessCategories/RealEstate";
import Electronic from "./BusinessCategories/Electronic";
import FoodDrinks from "./BusinessCategories/FoodDrinks";
import HomeAppliances from "./BusinessCategories/HomeAppliances";
import HealthBeauty from "./BusinessCategories/HealthBeauty";
import ConstructionBuilding from "./BusinessCategories/ConstructionBuilding";
import EducationServices from "./BusinessCategories/EducationServices";
import IndustrialEquipment from "./BusinessCategories/IndustrialEquipment";
import AgricultureLivestock from "./BusinessCategories/AgricultureLivestock";
import RepairMaintenance from "./BusinessCategories/RepairMaintenance";
import EventsWeddings from "./BusinessCategories/EventsWedding";
import ServicesFreelance from "./BusinessCategories/ServicesFreelance";
import DailyDiscounts from "./BusinessCategories/DailyDiscounts";
import WeeklyDiscounts from "./BusinessCategories/WeaklyDiscounts";
import Entertainments from "./BusinessCategories/Entertainments";

import PurchaseHistory from "./BusinessCategories/PurchaseHistory";
import TechnologyMethods from "./BusinessCategories/TechnologyMethods";
import Announcements from "./BusinessCategories/Announcements";

import Fashions from "./BusinessCategories/Fashion";


import Categorypiyasa from "./pages/Categorypiyasa";
import CategoryDubi from "./pages/CategoryDubi";
import Categorybole from "./pages/Categorybole";
import Categorybd from "./pages/Categorybd";
import Categoryadama from "./pages/Categoryadama";
import Categoryhawassa from "./pages/Categoryhawassa";
import Categorymexico from "./pages/Categorymexico";
import Categoryseatle from "./pages/Categoryseatle";
import Categoryag from "./pages/Categoryag";
import Categorymekelie from "./pages/Categorymekelie";
import Categoryjima from "./pages/Categoryjima";
import Categoryberlin from "./pages/Categoryberlin";
import Categoryparis from "./pages/Categoryparis";
import Categorycanada from "./pages/Categorycanada";


import RealHome from "./pages/Realhome";
import Electronicmaterial from "./pages/Electronicmaterials";
import CarHome from "./pages/CarHome";
import FoodHome from "./pages/FoodHome";
import ApplianceHome from "./pages/AppliaceHome";
import BeautyHome from "./pages/BeautyHome";
import WeddingHome from "./pages/WeddingHome";
import EntertainmentHome from "./pages/EntertainmentHome";
import TravelHome from "./pages/TravelHome";

function App() {
  return (
    <Router>
      <Navbar />
      <Search />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Category1 />} />
        <Route path="/home2" element={<Home/>} />
        <Route path="/piassa" element={<Categorypiyasa />} />
        <Route path="/Dubi" element={<CategoryDubi />} />
         <Route path="/Bahir Dar" element={<Categorybd />} />
         <Route path="/Adama" element={<Categoryadama />} />
         <Route path="/Bole" element={<Categorybole/>} />
          <Route path="/Hawassa" element={<Categoryhawassa />} />
          <Route path="/Mexico" element={<Categorymexico />} />
          <Route path="/seatle" element={<Categoryseatle />} />
          <Route path="/addis gebeya" element={<Categoryag />} />
          <Route path="/Mekelie" element={<Categorymekelie />} />
          <Route path="/jima " element={<Categoryjima />} />
          <Route path="/berlin " element={<Categoryberlin/>} />
          <Route path="/paris " element={<Categoryparis/>} />
          <Route path="/canada" element={<Categorycanada/>} />

          <Route path="/realhome" element={<RealHome/>} />
          <Route path="/electronicmaterial" element={<Electronicmaterial/>} />
          <Route path="/carhome" element={<CarHome/>} />
          <Route path="/foodhome" element={<FoodHome/>} />
          <Route path="/appliancehome" element={<ApplianceHome/>} />
          <Route path="/beautyhome" element={<BeautyHome/>} />
          <Route path="/weddinghome" element={<WeddingHome/>} />
          <Route path="/entertainment" element={<EntertainmentHome/>} />
          <Route path="/travel" element={<TravelHome/>} />

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
           <Route path="/dealsandoffers" element={< DealsandOffers/>} />
           <Route path="/brands" element={< Brands/>} />
           <Route path="/customerservices" element={< CustomerServices/>} />
           <Route path="/todaysdeals" element={< TodaysDeals/>} />

            
            <Route path="/chat" element={< Questions/>} />
             <Route path="/entertainments" element={< Entertainments/>} />
             <Route path="/purchasehistory" element={< PurchaseHistory/>} />
             <Route path="/technologymethods" element={< TechnologyMethods/>} />
             <Route path="/announcements" element={< Announcements/>} />
             <Route path="/car-brands" element={< CarBrands/>} />
            <Route path="/fashions" element={< Fashion/>} />
            <Route path="/real-estates" element={< RealEstate/>} />
            <Route path="/electronics" element={< Electronic/>} />
            <Route path="/food-drinks" element={< FoodDrinks/>} />
            <Route path="/home-appliances" element={< HomeAppliances/>} />
            <Route path="/health-beauty" element={< HealthBeauty/>} />
             <Route path="/construction-building" element={<ConstructionBuilding />} />
             <Route path="/education-services" element={< EducationServices/>} />
              <Route path="/industrial-equipments" element={< IndustrialEquipment/>} />
              <Route path="/agriculture-livestock" element={< AgricultureLivestock/>} />
              <Route path="/repair-maintenance" element={< RepairMaintenance/>} />
              <Route path="/event-weddings" element={< EventsWeddings/>} />
              <Route path="/freelance-services" element={< ServicesFreelance/>} />
              <Route path="/daily discounts" element={< DailyDiscounts/>} />
              <Route path="/weekly discounts" element={< WeeklyDiscounts/>} />
            
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
           
        <Route path="/checkout" element={<Checkout />} /> {/* 👈 add this route */}
      </Routes>
      <Back/>
      <Footer />
    </Router>
  );
}
export default App;
