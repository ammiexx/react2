// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
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
function App() {
  return (
    <Router>
      <Navbar />
      <Search />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/wanted" element={<Wanted />} />
        <Route path="/forsale" element={<ForSale />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
