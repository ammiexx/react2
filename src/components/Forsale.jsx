// Forsale.jsx
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./Success";

const stripePromise = loadStripe(
  "pk_test_51RxBXuC2J5esJHJB3deOeOQ3ZhxYhyM9TT4yjZvE7cSgCQGD3BW2CY0rFFTUmgvLZDgoLRA0QYUNPoWpVqweBgUh00jhNFUdVm"
);

const dummyProducts = [
  {
    id: 1,
    name: "Nike Air Zoom Pegasus",
    description: "Lightweight running shoes with responsive cushioning.",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1585032767761-878270336a0b?w=600&auto=format&fit=crop&q=60",
    specs: ["Size: 40-45", "Color: Black", "Material: Mesh", "Weight: 250g"],
  },
  {
    id: 2,
    name: "Apple iPhone 14",
    description: "128GB, Super Retina XDR display, A15 Bionic chip.",
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1679027554905-26e911504796?w=600&auto=format&fit=crop&q=60",
    specs: ["128GB", "6.1 inch", "Color: Midnight", "Dual Camera"],
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    description: "Noise cancelling wireless headphones.",
    price: 19000,
    image:
      "https://images.unsplash.com/photo-1697289481485-0a36eb4f9794?w=600&auto=format&fit=crop&q=60",
    specs: ["Bluetooth 5.2", "Color: Silver", "Battery: 30hrs"],
  },
  {
    id: 4,
    name: "Samsung Galaxy Watch 5",
    description: "Smartwatch with health monitoring features.",
    price: 16500,
    image:
      "https://images.unsplash.com/photo-1553545204-4f7d339aa06a?w=600&auto=format&fit=crop&q=60",
    specs: ["44mm", "GPS + LTE", "Water Resistant"],
  },
  {
    id: 5,
    name: "Dell XPS 13",
    description: "13.4-inch laptop with Intel i7 and 16GB RAM.",
    price: 69000,
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80",
    specs: ["16GB RAM", "512GB SSD", "Color: Silver", "Battery: 12hrs"],
  },
  {
    id: 6,
    name: "Canon EOS R10",
    description: "Mirrorless camera with 24.2MP APS-C sensor.",
    price: 48000,
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=500&q=80",
    specs: ["24.2MP", "4K Video", "Lens: 18-45mm"],
  },
  {
    id: 7,
    name: "Adidas Ultraboost",
    description: "Comfortable running shoes with Boost cushioning.",
    price: 9500,
    image:
      "https://images.unsplash.com/photo-1610945102998-749b4a3d798c?w=600&auto=format&fit=crop&q=60",
    specs: ["Size: 38-44", "Color: White", "Material: Knit"],
  },
  {
    id: 8,
    name: "Kindle Paperwhite",
    description: "Waterproof e-reader with adjustable warm light.",
    price: 7500,
    image:
      "https://plus.unsplash.com/premium_photo-1699792104161-918ea0897b5a?w=600&auto=format&fit=crop&q=60",
    specs: ["6.8 inch", "8GB Storage", "Battery: Weeks"],
  },
  {
    id: 9,
    name: "GoPro HERO11",
    description: "Action camera with 5.3K video and HyperSmooth.",
    price: 21500,
    image:
      "https://media.istockphoto.com/id/1254633724/photo/social-media-influencer-using-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=v9u1dzAc_u7wKmS4AIDnzV-8kwEX_SraSWYzVCSZh_w=",
    specs: ["5.3K Video", "Waterproof", "Stabilization"],
  },
  {
    id: 10,
    name: "Bose SoundLink Flex",
    description: "Portable Bluetooth speaker with deep bass.",
    price: 8000,
    image:
      "https://images.unsplash.com/photo-1620207418302-439b387441b0?auto=format&fit=crop&w=500&q=80",
    specs: ["Bluetooth 5.1", "Waterproof", "Battery: 12hrs"],
  },
  {
  id: 11,
  name: "HP Spectre x360",
  description: "Convertible 2-in-1 laptop with 11th Gen Intel i7.",
  price: 72000,
  image:
    "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=600&q=80",
  specs: ["16GB RAM", "1TB SSD", "13.3 inch", "Touchscreen"],
},
{
  id: 12,
  name: "PlayStation 5",
  description: "Next-gen gaming console with ultra-fast SSD.",
  price: 45000,
  image:
    "https://images.unsplash.com/photo-1606813907291-d86efa9b94d8?auto=format&fit=crop&w=600&q=80",
  specs: ["825GB SSD", "Ray Tracing", "4K Gaming"],
},
{
  id: 13,
  name: "Apple MacBook Pro 14",
  description: "M1 Pro chip with stunning Liquid Retina XDR display.",
  price: 115000,
  image:
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
  specs: ["16GB RAM", "512GB SSD", "14 inch", "Battery: 17hrs"],
},
{
  id: 14,
  name: "DJI Mini 3 Pro",
  description: "Lightweight drone with 4K HDR video and obstacle sensors.",
  price: 68000,
  image:
    "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=80",
  specs: ["4K Video", "249g", "GPS Tracking"],
},
{
  id: 15,
  name: "Oculus Quest 2",
  description: "Standalone VR headset with 128GB storage.",
  price: 35000,
  image:
    "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=600&q=80",
  specs: ["128GB", "VR Wireless", "Touch Controllers"],
},
{
  id: 16,
  name: "Logitech MX Master 3",
  description: "Ergonomic wireless mouse with customizable buttons.",
  price: 5200,
  image:
    "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=600&q=80",
  specs: ["Bluetooth", "USB-C Charging", "7 Buttons"],
},
{
  id: 17,
  name: "Samsung QLED 55” TV",
  description: "4K UHD Smart TV with vibrant Quantum Dot display.",
  price: 58000,
  image:
    "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80",
  specs: ["55 inch", "4K UHD", "HDR10+"],
},

];

const Forsale = () => {
    
  const [cart, setCart] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // Buy Now with Stripe
// Buy Now with Stripe
const handleBuyNow = async (product) => {
  const stripe = await stripePromise;

  const response = await fetch("https://djanagobackend-5.onrender.com/api/create-checkout-session/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ],
    }),
  });

  const session = await response.json();
  await stripe.redirectToCheckout({ sessionId: session.id });
};


 const beginCheckout = async () => {
  const stripe = await stripePromise;

  const response = await fetch("https://djanagobackend-5.onrender.com/api/api/create-checkout-session/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: cart.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: 1,
      })),
    }),
  });

  const session = await response.json();
  await stripe.redirectToCheckout({ sessionId: session.id });
};


  // Filter products by search term
  const filteredProducts = dummyProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4"></h1>

      {/* Search Bar */}
      {/* Search Bar */}
<div className="flex justify-center mb-6">
  <input
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full sm:w-1/2 md:w-1/3 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>


      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition"
            >
             <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-2 transform transition-transform duration-300 hover:scale-105"
                />

              <h3 className="text-sm font-semibold">{product.name}</h3>
              <p className="text-blue-600 font-bold text-sm mb-1">
                {product.price.toLocaleString()} Birr
              </p>

              {/* Expandable Details */}
              {expanded === product.id && (
                <div className="mb-2">
                  <p className="text-gray-600 text-xs">{product.description}</p>
                  <ul className="list-disc list-inside text-xs text-gray-500 mt-1">
                    {product.specs.map((spec, i) => (
                      <li key={i}>{spec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Buttons */}
              <div className="mt-2 flex gap-3 items-center">
                <button
                  onClick={() => toggleExpand(product.id)}
                  className="text-xs font-medium text-gray-700 hover:underline"
                >
                  {expanded === product.id ? "View Less" : "View More"}
                </button>
                <button
  onClick={() => handleBuyNow(product)}
  className="px-3 py-1 text-xs rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
>
  Buy Now
</button>

              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-gray-500 text-sm">
            No products found.
          </p>
        )}
      </div>

      {/* Cart Section */}
      <hr className="my-8" />

      {cart.length === 0 ? (
        <p className="text-gray-500 text-sm">No items in cart.</p>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg shadow text-sm">
          <ul className="mb-3 space-y-1">
            {cart.map((item, i) => (
              <li key={i} className="text-gray-700">
                {item.name} -{" "}
                <span className="font-medium">
                  {item.price.toLocaleString()} Birr
                </span>
              </li>
            ))}
          </ul>
          <p className="font-bold text-sm text-gray-800 mb-3">
            Total:{" "}
            {cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}{" "}
            Birr
          </p>
          <button
            onClick={beginCheckout}
            className="px-4 py-2 text-sm rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
          >
            Checkout with Stripe
          </button>
        </div>
      )}
    </div>
  );
};

export default Forsale;
