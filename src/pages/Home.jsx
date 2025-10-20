import React, { useState, useEffect } from "react";
import heroImage from "../assets/images/founder.jpg"; 
import secondHeroImage from "../assets/images/myteams.png"; 

import { Link } from "react-router-dom";
import { UserGroupIcon, GlobeAltIcon, BoltIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const slides = [
  {
    image: secondHeroImage,
    title: (
      <>
        <span className="text-blue-600 text-6xl font-extrabold">
          Knash Digital Market (KDM)
        </span>{" "}
         Empowering Local Enterprises Across the Country
      </>
    ),
    subtitle:
      "We help local shops expand their reach and connect with more customers. Grow your business, increase your visibility, and reach your full potential with our powerful networking tools and cutting-edge solutions.",
    cta1: { text: "Explore Shops", link: "/discounts" },
    cta2: { text: "Add Your Business", link: "/form" },
  },
  {
    image: heroImage,
     title: (
      <>
        <span className="text-blue-600 text-6xl font-extrabold">
          Knash Digital Market (KDM)
        </span>{" "}
          - Connecting Enterprises to Customers Nationwide
      </>
    ),
    subtitle:
      "At Knash digital market, we build a robust network linking enterprizes to customers. Explore opportunities, discover offers, and grow together. Our platform helps you find the right connections, increase your sales, and stay ahead in the market with ease and efficiency.",
    cta1: { text: "Explore Services", link: "/services" },
    cta2: { text: "Add Your Business", link: "/form" },
  },
];


  const [current, setCurrent] = useState(0);
 useEffect(() => {
  const timer = setTimeout(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, 5000); 

  return () => clearTimeout(timer);
}, [current, slides]);


  return (
    <div className="font-sans text-gray-900 -my-7">
      
      {/* Hero Slider Section */}
      <section className="relative w-full h-[650px] lg:h-[750px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6">
              <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                {slide.title}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-200 max-w-4xl mb-8">
                {slide.subtitle}
              </p>
              <div className="flex gap-4">
                <Link
                  to={slide.cta1.link}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-medium text-lg"
                >
                  {slide.cta1.text}
                </Link>
                <Link
                  to={slide.cta2.link}
                  className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium text-lg"
                >
                  {slide.cta2.text}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      
      <section className="bg-white -pb-3 pt-1">
        <div className="max-w-7xl mx-auto p-2 p-6 lg:px-8 text-center space-y-12">
          <h2 className="text-3xl text-blue-900">Why Knash digital market?</h2>
          <p className="text-blue-700 max-w-3xl mx-auto text-2xl">We are creating a digital shopping platform that helps clients to purchase their need at the best value! </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-200 rounded-1xl hover:shadow-lg transition">
              <BoltIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-blue-500 mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">Our platform ensures enterprises and clients connect quickly and efficiently, building trust and reliability. </p>
            </div>

            <div className="p-6 bg-gray-200 rounded-xl shadow hover:shadow-lg transition">
              <UserGroupIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-blue-500">Grow Your Network</h3>
              <p className="text-gray-600">
                Expand your business reach and meet new clients through our powerful networking tools.
              </p>
            </div>

            <div className="p-6 bg-gray-200 rounded-xl shadow hover:shadow-lg ">
              <GlobeAltIcon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-blue-500">Nationwide Impact</h3>
              <p className="text-gray-600">
                We help Enterpriese scale across the country, connecting you with customers in every region.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-500 pt-2 pb-17"> 
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center text-white space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Make an Impact?</h2>
          <p className="text-lg sm:text-xl">
            Join Knash digital market today and start connecting with enterprises and clients nationwide.
          </p>
          <Link
            to="/form"
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}
