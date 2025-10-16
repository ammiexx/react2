import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTelegramPlane, FaTiktok } from "react-icons/fa";

const Recents = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://djanagobackend-5.onrender.com/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => setError("Failed to fetch products"))
      .finally(() => setLoading(false));
  }, []);

  // Filter products posted in last 48 hours
  const recentProducts = products.filter((item) => {
    const postedDate = new Date(item.date_posted);
    const now = new Date();
    const hoursDiff = (now - postedDate) / (1000 * 60 * 60);
    return hoursDiff <= 48;
  });

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 w-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Recent Posts
      </h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-gray-200 rounded-lg h-40 flex items-center p-4"
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
      ) : recentProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-semibold">
          No recent posts.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-transform hover:scale-[1.02] p-4 flex flex-col cursor-pointer"
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
                  <p className="text-sm text-gray-500">📍 {item.location}</p>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
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
                {item.contact_tick && (
                  <a
                    href={item.contact_tick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-white bg-black px-2 py-1 rounded hover:bg-gray-800 transition text-sm"
                  >
                    <FaTiktok /> TikTok
                  </a>
                )}
                {item.discount && (
                  <span className="text-sm font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
                    {item.discount}% OFF
                  </span>
                )}
              </div>

              <div className="mt-auto text-blue-600 font-bold text-right">&gt;</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recents;
