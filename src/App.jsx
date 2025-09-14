
import React from "react";
import { useTheme } from "./pages/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUp,SignIn } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Search from "./components/Search"
import Back from "./components/Back";
import Footer from "./components/Footer";
import Signup from "./components/Signup"
import Login from "./components/Login";
import Home from "./pages/Home2";
import AboutUs from "./pages/Aboutus";
import Chat2 from "./pages/Chat2";
import Category1 from "./pages/Category1";
import Logout from "./components/Logout";
import Profile from "./pages/Profile"
import HelpCenter from "./categories/HelpCenter";
import ContactUs from "./categories/ContactUs";
import Privacy from "./categories/Privacy";
import Language from "./categories/Language";
import Brands from "./categories/Brands";
import CustomerServices from "./categories/CustomerServices";
import Success from './pages/Success';
import Cancel from './pages/Cancel';
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

// new imports from the new folder
import Admin from "./new/Admins";
import Agriculture from "./new/Agricultrure";
import Architecture from "./new/Architectures";
import Art from "./new/Arts";
import Automotive from "./new/Automotives";
import Babies from "./new/Babies";
import Books from "./new/Books";
import Carwash from "./new/Carwashes";
import Cleaning from "./new/Cleanings";
import Consultancy from "./new/Consultancies";
import Decore from "./new/Decores";
import Design from "./new/Designes";
import Digital from "./new/Digitals"; 
import Elearning from "./new/Elearnings";
import Energy from "./new/Energies";
import Fitness from "./new/Fitnesses";
import Freight from "./new/Freights";
import Funding from "./new/Fundings";
import Gamming from "./new/Gammings";
import Green from "./new/Green";
import Homesecurity from "./new/HomeSecurities";
import Human from "./new/Humans";
import Insurances from "./new/Insurances";
import Jewelries from "./new/Jewelries";
import Land from "./new/Lands";
import Logistic from "./new/Logistics";
import Marin from "./new/Marins";
import Medical from "./new/Medicals";
import Mental from "./new/Mentals";
import Music from "./new/Musics";
import Nonprofit from "./new/Nonprofits";
import Nursing from "./new/Nursings";
import Office from "./new/Offices";
import Pet from "./new/Pets";
import Photography from "./new/Photographies";
import Podcasting from "./new/Podcastings";
import Printing from "./new/Printings";
import Rental from "./new/Rentals";
import Repair from "./new/Repair";
import Sallon from "./new/Sallons";
import Security from "./new/Securities";
import Software from "./new/Softwares";
import Stationary from "./new/Stationaries";
import Tatue from "./new/Tatues";
import Telecom from "./new/Telecoms";
import Toys from "./new/Toys";
import Translation from "./new/Translations";
import Virtual from "./new/Virtuals";
import Waste from "./new/Wastes";
import Form from "./pages/Forms";
import MyPosts from "./pages/MyPosts";
import QuickLinks from "./pages/QuickLinks";
import categories from "./components/Search"
import Recents from "./pages/Recents";
import Notification from "./pages/Notifications";
import Nearby from "./pages/Nearby";
import Forsale from "./components/Forsale";
import Welcome from "./pages/WellCome";
import Holiday from "./pages/HolidayDiscounts";
import NearbyDetail from "./pages/NearbyDetail";
import PaymentUpdates from "./pages/PaymentUpdates";
import PendingOrders from "./pages/PendingOrders";
import CompletedOrders from "./pages/CompletedOrders";
import PaymentMethods from "./pages/PaymentMethods";
import Wallet from "./pages/Wallet";
import Subscriptions from "./pages/Subscriptions";
import Refunds from "./pages/Refunds";
import Category2 from "./pages/Category2";


function App() {
  return (
    <div >
    <Router>
      <Navbar />
      <Search/>
      <Routes>
        <Route path="/services" element={<Category2/>} />
        <Route path="/payment-updates" element={<PaymentUpdates />} />
        <Route path="/pending-orders" element={<PendingOrders />} />
        <Route path="/completed-orders" element={<CompletedOrders />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/refunds" element={<Refunds />} />
        <Route path="/nearby-detail" element={<NearbyDetail/>} />
        <Route path="/holyday discounts" element={<Holiday />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<h1 className="p-10 text-center text-red-600">❌ Payment Cancelled</h1>} /> 
        <Route path="/forsale" element={<Forsale/>} />
        <Route path="/Nearby-shops" element={<Nearby/>} />
        <Route path="/notifications" element={<Notification/>} />
        <Route path="/recents" element={<Recents/>} />
        <Route path="/myposts" element={<MyPosts/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Virtual_Assistant_And_Admin_Supports" element={<Admin />} />
        <Route path="/Agriculture_And_Livestock" element={<Agriculture />} />
        <Route path="/form" element={<Form />} />
        <Route path="/Architecture_And_Engineering_Services" element={<Architecture />} />
        <Route path="/Art_And_Handicrafts" element={<Art />} />
        <Route path="/Automotive_Services" element={<Automotive/>} />
        <Route path="/Babies_And_Kids_Products" element={<Babies />} />
        <Route path="/Books_And_Stationaries" element={<Books />} />
        <Route path="/Car_Wash" element={<Carwash />} />
        <Route path="/Cleaning_And_Sanitation_Services" element={<Cleaning/>} />
        <Route path="/legal_And_Consultancy_Services" element={<Consultancy/>} />
        <Route path="/Event_planning_And_Decore" element={<Decore />} />
        <Route path="/Furniture_And_Interior_design" element={<Design />} />
        <Route path="/Digital_Marketing_Services" element={<Digital/>} />
        <Route path="/Energy_And_Utilities" element={<Energy />} />
        <Route path="/Elearning_And_Online_Cources" element={<Elearning />} />
        <Route path="/Gamming_And_esports" element={<Gamming />} />
        <Route path="/Croud_Funding_And_Investment_Services" element={<Funding />} />
        <Route path="/Courier_And_Freight_Services" element={<Freight />} />
        <Route path="/fitness_And_Sports_servies" element={<Fitness/>} />
        <Route path="/Jewelries" element={<Jewelries/>} />
        <Route path="/Finance_And_Insurances" element={<Insurances/>} />
        <Route path="/Human_Resource_And_Staffing" element={<Human/>} />
        <Route path="/Security_Services" element={<Homesecurity />} />
        <Route path="/Green_And_Ecofreindly_products" element={<Green />} />
        <Route path="/Music_And_Instruments" element={<Music />} />
        <Route path="/Mental_Health_And_Wellness_Services" element={<Mental />} />
        <Route path="/Medical_And_Pharmaceuticals" element={<Medical />} />
        <Route path="/Maring_And_Boating_Services" element={<Marin />} />
        <Route path="/Logistics_And_Delivery_Services" element={<Logistic />} />
        <Route path="/Landescaping_And_Gardening_sevices" element={<Land/>} />
        <Route path="/Pet_Supplies_And_Services" element={<Pet />} />
        <Route path="/Coworking_And_Office_Spaces" element={<Office/>} />
        <Route path="/Elderly_And_Nursing_Services" element={<Nursing />} />
        <Route path="/Non_Profit_And_Charity_organizations" element={<Nonprofit/>} />
        <Route path="/Repair_and_Maintenance" element={<Repair/>} />
        <Route path="/Rental_Services" element={<Rental/>}/>
        <Route path="/Printing_And_Publishing" element={<Printing />} />
        <Route path="/Podcasting_And_Audio_production" element={<Podcasting/>} />
        <Route path="/Video_And_Photography" element={<Photography />} />
        <Route path="/Bauty_Sallons_BarberShops" element={<Sallon/>} />
        <Route path="/Security_Services" element={<Security />} />
        <Route path="/SoftWare_And_IT_Services" element={<Software/>} />
        <Route path="/Stationary_And_Office_Supplies" element={<Stationary />} />
        <Route path="/Tatue_And_Piercing_Studios" element={<Tatue/>} />
        <Route path="/Telecome_Services" element={<Telecom />} />
        <Route path="/Waste_Management_And_Recycling" element={<Waste />} />
        <Route path="/Virtual_Events_And_Webbinaries" element={<Virtual/>} />
        <Route path="/Language_And_Translation_Services" element={<Translation />} />
        <Route path="/Toys_And_Games" element={<Toys />} />
        <Route path="/discounts" element={<Category1 />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/" element={<Category1 />} />
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
         <Route path="/login" element={<Login />} />
         <Route path="/logout" element={<Logout />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/helpcenter" element={<HelpCenter />} />
         <Route path="/contactus" element={< ContactUs/>} />
         <Route path="/privacy" element={< Privacy/>} />
         <Route path="/language" element={< Language/>} />
         <Route path="/brands" element={< Brands/>} />
         <Route path="/customerservices" element={< CustomerServices/>} />
         <Route path="/technologymethods" element={< TechnologyMethods/>} />
         <Route path="/new advantages" element={< Announcements/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/chat" element={<Chat2/>} />
      </Routes>
      <Back/>
      <Footer />
    </Router>
    </div>
  );
}
export default App;
