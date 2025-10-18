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

        // Add remaining_days field
        data = data.map((item) => {
          if (item.discount_duration && item.date_posted) {
            const postedDate = new Date(item.date_posted);
            const deadline = new Date(
              postedDate.getTime() + item.discount_duration * 24 * 60 * 60 * 1000
            );
            const now = new Date();
            const remaining = Math.ceil(
              (deadline - now) / (1000 * 60 * 60 * 24)
            );
            return { ...item, remaining_days: remaining > 0 ? remaining : 0 };
          }
          return { ...item, remaining_days: null };
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
                {/* Product & Company Info */}
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

                {/* Discount and countdown */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {item.discount && (
                    <span className="text-sm font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
                      {item.discount}% OFF
                    </span>
                  )}

                  {item.remaining_days !== null && (
                    <span
                      className={`text-sm font-semibold px-2 py-1 rounded ${
                        item.remaining_days > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {item.remaining_days > 0
                        ? `${item.remaining_days} day${
                            item.remaining_days > 1 ? "s" : ""
                          } left`
                        : "Expired"}
                    </span>
                  )}
                </div>

                {/* Contact & Links */}
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

                {/* Call to action */}
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
