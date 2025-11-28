import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";

const DAY_MS = 1000 * 60 * 60 * 24;

// Constant texts for messages
const MESSAGES = {
  noInternet:
    "⚠️ Unable to connect. Please check your internet connection and try again.",
  noProducts:
    "🚀 No products or services found in this category yet. Be the first to showcase your business here!",
  loadingTagline: "Loading amazing deals and offers...",
  generalTagline:
    "✨ Discover products and services from trusted local businesses.",
};

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
        if (!response.ok) throw new Error("network");

        let data = await response.json();

        // Filter verified and categorized products
        data = data.filter(
          (item) => item.category === category && item.verified === true
        );

        // Process discount timing
        const processed = data.map((item) => {
          const now = new Date();
          const postedDate = item.date_posted
            ? new Date(item.date_posted)
            : new Date();
          const startOffsetDays =
            Number(item.discount_start_date ?? item.discount_start_date) ||
            null;
          const durationDays =
            Number(item.discount_duration ?? item.discount_duration) || null;

          let startDate = postedDate;
          if (!isNaN(startOffsetDays) && startOffsetDays !== null) {
            startDate = new Date(
              postedDate.getTime() + startOffsetDays * DAY_MS
            );
          }

          let endDate = null;
          if (!isNaN(durationDays) && durationDays !== null) {
            endDate = new Date(startDate.getTime() + durationDays * DAY_MS);
          }

          const remainingToBegin =
            startDate && startDate.getTime() > now.getTime()
              ? Math.ceil((startDate.getTime() - now.getTime()) / DAY_MS)
              : 0;

          const remainingToEnd =
            endDate && endDate.getTime() > now.getTime()
              ? Math.ceil((endDate.getTime() - now.getTime()) / DAY_MS)
              : 0;

          let status = "waiting";
          if (item.discount === "waiting") status = "waiting";
          else if (item.discount === "coming") status = "coming";
          else if (item.discount === "open") status = "open";
          else if (remainingToBegin > 0) status = "to_begin";
          else if (endDate) status = remainingToEnd > 0 ? "active" : "expired";
          else status = "active";

          return {
            ...item,
            _postedDate: postedDate,
            _startDate: startDate,
            _endDate: endDate,
            remainingToBegin,
            remainingToEnd,
            status,
          };
        });

        setProducts(processed);
        setError("");
      } catch (err) {
        setError("network");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="max-w-[1200px] mx-auto my-3 px-5 w-full bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        {title}
      </h2>
      <p className="text-center text-gray-500 mb-8">
        {MESSAGES.generalTagline}
      </p>

      <section className="mb-12 w-full">
        {/* Error state */}
        {error === "network" && (
          <p className="text-center text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg mb-6">
            {MESSAGES.noInternet}
          </p>
        )}

        {/* Loading state */}
        {loading && (
          <>
            <p className="text-center text-gray-500 mb-4">
              {MESSAGES.loadingTagline}
            </p>
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
          </>
        )}

        {/* Empty state (no products found but no error) */}
        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-600 text-lg font-medium bg-gray-100 border border-gray-200 py-5 rounded-xl shadow-sm">
            {MESSAGES.noProducts}
          </p>
        )}

        {/* Success state */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-transform transform hover:scale-105 p-5 cursor-pointer flex flex-col border border-gray-100"
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
                    <p className="text-lg font-semibold text-green-600">
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

                {/* Discount badges */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {item.discount &&
                    item.status !== "waiting" &&
                    item.status !== "open" &&
                    item.status !== "coming" && (
                      <span className="text-sm font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
                        {item.discount}% OFF
                      </span>
                    )}

                  {item.status === "waiting" && (
                    <span className="text-sm font-semibold bg-gray-200 text-gray-600 px-2 py-1 rounded">
                      ⏳ Waiting For Discount
                    </span>
                  )}
                  {item.status === "coming" && (
                    <span className="text-sm font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      🔜 Coming Soon
                    </span>
                  )}

                  {item.status === "open" && (
                    <span className="text-sm font-semibold bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      🔜 We Are Open
                    </span>
                  )}

                  {item.status === "to_begin" && item.status !== "coming" && (
                    <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {item.remainingToBegin}{" "}
                      {item.remainingToBegin > 1 ? "days" : "day"} left to begin
                    </span>
                  )}

                  {item.status === "active" && (
                    <>
                      {item._endDate ? (
                        <span className="text-sm font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          {item.remainingToEnd > 0
                            ? `${item.remainingToEnd} ${
                                item.remainingToEnd > 1 ? "days" : "day"
                              } left to end`
                            : "Ends today"}
                        </span>
                      ) : (
                        <span className="text-sm font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          ⚡ Ongoing
                        </span>
                      )}
                    </>
                  )}

                  {item.status === "expired" && (
                    <span className="text-sm font-semibold bg-red-100 text-red-700 px-2 py-1 rounded">
                      ❌ Discount expired
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

                {/* CTA footer */}
                <p className="text-sm text-gray-600 mt-auto">
                  💬 Visit our Telegram to see the latest price and offers
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Shops;
