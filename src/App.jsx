
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Footer from "./components/Footer";
import Signup from "./components/Signup"
import Login from "./components/Login";
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
import Daily from "./pages/DailyDiscounts";
import Week from "./pages/WeeklyDiscounts";
import Newp from "./pages/New";
import Upcomming from "./pages/Upcomming";
import Form from "./pages/Forms";
import MyPosts from "./pages/MyPosts";
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
import MyProfile from "./pages/MyProfile";
import FloatingChat from "./pages/FloatingChat";
import SearchResults from "./components/SearchResults";
import CommentsPage from "./pages/CommentsPage";
import CopyRight from "./components/CopyRight";
import Shops from "./pages/Shops";
import Videos from "./pages/Videos";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen"> 
      <div className="bg-gray-800"> 
    <Navbar />
    <Search />
  </div>
      <main className="flex-grow">
      <Routes>
        <Route path="/videos" element={<Videos/>} />
        <Route path="/comments" element={<CommentsPage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/myprofile" element={<MyProfile/>} />
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
        <Route path="/form" element={<Form />} />


<Route path="/Virtual_Assistant_And_Admin_Supports" element={<Shops category="admin" title="Virtual Assistance & Admin Support – Simplify Your Work!" />} />
<Route path="/Architecture_And_Engineering_Services" element={<Shops category="architecture" title="Architecture & Engineering Services – Build Your Vision!" />} />
<Route path="/Art_And_Handicrafts" element={<Shops category="art" title="Discover Unique Art & Handicrafts – Shop Now!" />} />
<Route path="/Automotive_Services" element={<Shops category="automotive" title="Top Automotive Services – Keep Your Vehicle in Shape!" />} />
<Route path="/Babies_And_Kids_Products" element={<Shops category="baby" title="Adorable Essentials for Your Little Ones!" />} />
<Route path="/Books_And_Stationaries" element={<Shops category="books" title="Books & Stationary – Fuel Your Knowledge!" />} />
<Route path="/Car_Wash" element={<Shops category="carwash" title="Sparkling Clean – Explore Car Wash & Detailing Services!" />} />
<Route path="/Cleaning_And_Sanitation_Services" element={<Shops category="cleaning" title="Spotless Spaces – Discover Cleaning & Sanitation Services!" />} />
<Route path="/legal_And_Consultancy_Services" element={<Shops category="consultancy" title="Expert Legal & Consultancy Services – Get Advice Now!" />} />
<Route path="/Event_planning_And_Decore" element={<Shops category="decor" title="Plan Perfect Events – Explore Decor & Planning Services!" />} />
<Route path="/Furniture_And_Interior_design" element={<Shops category="design" title="Stylish Interiors – Transform Your Space with Furniture & Design!" />} />
<Route path="/Digital_Marketing_Services" element={<Shops category="digital" title="Boost Your Brand – Explore Digital Marketing Services!" />} />
<Route path="/Energy_And_Utilities" element={<Shops category="energy" title="Reliable Energy & Utility Services – Power Your Life!" />} />
<Route path="/Elearning_And_Online_Cources" element={<Shops category="elearning" title="Learn Anytime – Explore Elearning & Online Courses!" />} />
<Route path="/Gamming_And_esports" element={<Shops category="gaming" title="Level Up – Discover Gaming & eSports Services!" />} />
<Route path="/Croud_Funding_And_Investment_Services" element={<Shops category="funding" title="Fund Your Ideas – Explore Crowd Funding & Investment Services!" />} />
<Route path="/Courier_And_Freight_Services" element={<Shops category="freight" title="Fast & Reliable – Discover Courier & Freight Services!" />} />
<Route path="/fitness_And_Sports_servies" element={<Shops category="fitness" title="Gear Up for Greatness – Explore Top Fitness Essentials!" />} />
<Route path="/Jewelries" element={<Shops category="jewelry" title="Sparkle & Shine – Discover Exquisite Jewelries!" />} />
<Route path="/Finance_And_Insurances" element={<Shops category="insurances" title="Secure Your Future – Explore Finance & Insurance Services!" />} />
<Route path="/Human_Resource_And_Staffing" element={<Shops category="human" title="Find the Right Talent – Human Resources & Staffing Solutions!" />} />
<Route path="/Security_Services" element={<Shops category="security" title="Stay Safe – Explore Top Security Services!" />} />
<Route path="/Green_And_Ecofreindly_products" element={<Shops category="green" title="Eco-Friendly Products – Shop Sustainable & Green!" />} />
<Route path="/Music_And_Instruments" element={<Shops category="music" title="Unleash Creativity – Discover Music & Instruments!" />} />
<Route path="/Mental_Health_And_Wellness_Services" element={<Shops category="mental" title="Mental Health & Wellness – Services to Support You!" />} />
<Route path="/Medical_And_Pharmaceuticals" element={<Shops category="medical" title="Healthcare Essentials – Explore Medical & Pharmaceuticals!" />} />
<Route path="/Maring_And_Boating_Services" element={<Shops category="marin" title="Marine & Boating Services – Navigate with Confidence!" />} />
<Route path="/Logistics_And_Delivery_Services" element={<Shops category="logistic" title="Reliable Logistics & Delivery – Services at Your Doorstep!" />} />
<Route path="/Landescaping_And_Gardening_sevices" element={<Shops category="land" title="Beautiful Gardens – Explore Landscaping & Gardening Services!" />} />
<Route path="/Pet_Supplies_And_Services" element={<Shops category="pet" title="Pamper Your Pets – Discover Pet Supplies & Services!" />} />
<Route path="/Coworking_And_Office_Spaces" element={<Shops category="office" title="Flexible Workspaces – Discover Coworking & Office Spaces!" />} />
<Route path="/Elderly_And_Nursing_Services" element={<Shops category="nursing" title="Elderly Care & Nursing Services – Support at Home!" />} />
<Route path="/Non_Profit_And_Charity_organizations" element={<Shops category="nonprofit" title="Make a Difference – Explore Non-Profit & Charity Organizations!" />} />
<Route path="/Repair_and_Maintenance" element={<Shops category="repair" title="Repair & Maintenance Services – Keep Things Running Smoothly!" />} />
<Route path="/Rental_Services" element={<Shops category="rental" title="Convenient Rental Services – Find What You Need!" />} />
<Route path="/Printing_And_Publishing" element={<Shops category="printing" title="Bring Your Ideas to Life – Explore Printing & Publishing!" />} />
<Route path="/Podcasting_And_Audio_production" element={<Shops category="podcasting" title="Podcast & Audio Production – Make Your Voice Heard!" />} />
<Route path="/Video_And_Photography" element={<Shops category="photography" title="Capture Every Moment – Shop Video & Photography Essentials!" />} />
<Route path="/health-and-beauties" element={<Shops category="sallons" title="Enhance Your Natural Glow – Health & Beauty Essentials!" />} />
<Route path="/SoftWare_And_IT_Services" element={<Shops category="software" title="Software & IT Services – Tech Solutions for You!" />} />
<Route path="/Stationary_And_Office_Supplies" element={<Shops category="stationary" title="Stationary & Office Supplies – Everything You Need!" />} />
<Route path="/women_fashions" element={<Shops category="women_fashions" title="Express Your Style!" />} />
<Route path="/Telecome_Services" element={<Shops category="telecom" title="Telecommunication Services – Stay Connected!" />} />
<Route path="/Waste_Management_And_Recycling" element={<Shops category="waste" title="Waste Management & Recycling – Sustainable Solutions!" />} />
<Route path="/Virtual_Events_And_Webbinaries" element={<Shops category="virtual" title="Virtual Events & Webinars – Connect Anywhere!" />} />
<Route path="/Language_And_Translation_Services" element={<Shops category="translation" title="Language & Translation Services – Communicate Globally!" />} />
<Route path="/Toys_And_Games" element={<Shops category="toys" title="Fun & Games – Discover Toys & Play Essentials!" />} />
<Route path="/home-appliances" element={<Shops category="appliances" title="Beautify your homes!" />} />
<Route path="/men_shoes" element={<Shops category="men" title="Step Up Your Style – Shop the Latest Men’s Fashion!" />} />
<Route path="/homes" element={<Shops category="homes" title="Beautify Your Homes – Shop the Best Home Essentials!" />} />
<Route path="/men_fashions" element={<Shops category="men" title="Step Up Your Style – Explore the Latest Men’s Fashions!" />} />
<Route path="/car-brands" element={<Shops category="carbrands" title="Drive in Style – Shop Top Car Brands & Accessories!" />} />
<Route path="/food-and-beverages" element={<Shops category="foods" title="Delicious & Fresh – Discover Foods & Beverages!" />} />
<Route path="/events-and-weddings" element={<Shops category="events" title="Plan Your Perfect Event – Explore Weddings & Event Services!" />} />
<Route path="/entertainments" element={<Shops category="entertainments" title="Fun Awaits – Shop Entertainment & Leisure Services!" />} />
<Route path="/travels" element={<Shops category="travels" title="Adventure Awaits – Discover Top Travel Services!" />} />
<Route path="/Agriculture_And_Livestock" element={<Shops category="agricultural" title="Adventure Awaits – Discover Top Travel Services!" />} />

          

        <Route path="/discounts" element={<Category1 />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/" element={<Category1 />} />
          <Route path="/daily discounts" element={<Daily/>} />
          <Route path="/weekly discounts" element={<Week/>} />
          <Route path="/new offers" element={<Newp/>} />
          <Route path="/upcomming offers" element={<Upcomming/>} />
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
      </main>
      <FloatingChat/>
      <Footer/>
      <CopyRight />
      </div>
    </Router>
    
  );
}
export default App;
