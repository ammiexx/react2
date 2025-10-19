import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";

const Shops = ({ category, title }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://djanagobackend-5.onrender.com/api/products/`
        );
        if (!response.ok) throw new Error("Connect to the internet");
        let data = await response.json();

        // Filter verified products by category
        data = data.filter(
          (item) => item.category === category && item.verified === true
        );

        // Calculate discount states
        data = data.map((item) => {
          const now = new Date();
          const postedDate = new Date(item.date_posted);

          let startDate = null;
          let endDate = null;
          let remainingToBegin = null;
          let remainingToEnd = null;
          let status = "waiting"; // default state

          if (item.discount_start_date) {
            startDate = new Date(
              postedDate.getTime() + item.discount_start_date * 24 * 60 * 60 * 1000
            );
            remainingToBegin = Math.ceil(
              (startDate - now) / (1000 * 60 * 60 * 24)
            );
          }

          if (item.discount_duration && startDate) {
            endDate = new Date(
              startDate.getTime() + item.discount_duration * 24 * 60 * 60 * 1000
            );
            remainingToEnd = Math.ceil(
              (endDate - now) / (1000 * 60 * 60 * 24)
            );
          }

          // Determine the discount state
          if (item.discount === "waiting") {
            status = "waiting";
          } else if (remainingToBegin > 0) {
            status = "to_begin"; // discount not started
          } else if (remainingToEnd > 0) {
            status = "active"; // currently running
          } else if (remainingToEnd <= 0 && item.discount !== "waiting") {
            status = "expired"; // ended
          }

          return {
            ...item,
            remainingToBegin,
            remainingToEnd,
            status,
          };
        });

        setProducts(data);
      } catch (err) {
        setError("No internet connection!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 w-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {title}
      </h2>

      <section className="mb-12 w-full">
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-gray-200 rounded-lg h-40 flex items-center justify-start p-4"
              >
                <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-semibold">
            Sell and Purchase your favorite product and service!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-transform hover:scale-[1.02] p-4 cursor-pointer flex flex-col"
                onClick={() =>
                  navigate("/nearby-detail", { state: { product: item } })
                }
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={item.profile_photo || "https://via.placeholder.com/60"}
                    alt={item.company_name}
                    className="w-16 h-16 rounded-full object-cover border border-gray-300"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-blue-600">
                      {item.product_name}
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {item.company_name}
                    </p>
                    {item.contact_phone && (
                      <p className="text-sm text-gray-500">
                        📞 {item.contact_phone}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">📍 {item.location}</p>
                  </div>
                </div>

                {/* Discount state */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {item.discount && item.discount !== "waiting" && (
                    <span className="text-sm font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
                      {item.discount}% OFF
                    </span>
                  )}

                  {item.status === "waiting" && (
                    <span className="text-sm font-semibold bg-gray-200 text-gray-600 px-2 py-1 rounded">
                      ⏳ Waiting for discount
                    </span>
                  )}

                  {item.status === "to_begin" && (
  <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
    {item.remainingToBegin} day
    {item.remainingToBegin > 1 ? "s" : ""} left to begin
  </span>
)}


                  {item.status === "active" && (
                    <span className="text-sm font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      ⚡ {item.discount}% active — {item.remainingToEnd} day
                      {item.remainingToEnd > 1 ? "s" : ""} left
                    </span>
                  )}

                  {item.status === "expired" && (
                    <span className="text-sm font-semibold bg-red-100 text-red-700 px-2 py-1 rounded">
                      ❌expired
                    </span>
                  )}
                </div>

                {/* Contact */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {item.contact_telegram && (
                    <a
                      href={item.contact_telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-white bg-blue-500 px-2 py-1 rounded hover:bg-blue-600 transition text-sm"
                    >
                      <FaTelegramPlane /> Telegram
                    </a>
                  )}
                </div>

                <p className="text-sm text-gray-600 mt-auto">
                  💬 Visit our Telegram to see the price
                </p>

                <div className="mt-2 text-blue-600 font-bold text-right">&gt;</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Shops;
