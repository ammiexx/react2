import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";

const DAY_MS = 1000 * 60 * 60 * 24;

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

        // Augment each item with calculated discount timing info
        data = data.map((item) => {
          const now = new Date();

          // Safely parse posted date; if missing, treat posted date as now (best-effort)
          const postedDate = item.date_posted ? new Date(item.date_posted) : new Date();

          // discount_start_date: number of days after postedDate when discount begins (if provided)
          // discount_duration: number of days the discount is active after start (if provided)
          const startOffsetDays = Number(item.discount_start_date ?? item.discount_start_date) || null;
          const durationDays = Number(item.discount_duration ?? item.discount_duration) || null;

          // Compute startDate:
          // If discount_start_date exists and is a valid number, startDate = postedDate + startOffsetDays
          // Otherwise startDate = postedDate (discount starts immediately if duration provided)
          let startDate = postedDate;
          if (!isNaN(startOffsetDays) && startOffsetDays !== null) {
            startDate = new Date(postedDate.getTime() + startOffsetDays * DAY_MS);
          }

          // Compute endDate if we have durationDays
          let endDate = null;
          if (!isNaN(durationDays) && durationDays !== null) {
            endDate = new Date(startDate.getTime() + durationDays * DAY_MS);
          }

          // Calculate remaining days to begin (if startDate > now)
          const remainingToBegin =
            startDate && startDate.getTime() > now.getTime()
              ? Math.ceil((startDate.getTime() - now.getTime()) / DAY_MS)
              : 0;

          // Calculate remaining days to end (if endDate exists)
          const remainingToEnd =
            endDate && endDate.getTime() > now.getTime()
              ? Math.ceil((endDate.getTime() - now.getTime()) / DAY_MS)
              : 0;

          // Determine status
          // Priority:
          // - if discount === 'waiting' -> waiting
          // - else if remainingToBegin > 0 -> to_begin
          // - else if endDate exists and remainingToEnd > 0 -> active
          // - else if endDate exists and remainingToEnd <= 0 -> expired
          // - else (no duration provided) -> active (ongoing)
          let status = "waiting";
          if (item.discount === "waiting") {
            status = "waiting";
          } else if (remainingToBegin > 0) {
            status = "to_begin";
          } else if (endDate) {
            status = remainingToEnd > 0 ? "active" : "expired";
          } else {
            // discount is not 'waiting', no duration given -> treat as "active" (no end)
            status = "active";
          }

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

        setProducts(data);
      } catch (err) {
        setError("No internet connection!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const plural = (n, singular = "day", pluralForm = "days") =>
    `${n} ${n > 1 ? pluralForm : singular}`;

  return (
    <div className="max-w-[1200px] mx-auto my-3 px-5 w-full bg-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{title}</h2>

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
            Sell and purchase your favorite products and services!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
             <div
  key={item.id}
  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-transform transform hover:scale-105 p-5 cursor-pointer flex flex-col border border-gray-100"
  onClick={() => navigate("/nearby-detail", { state: { product: item } })}
>

                {/* Product & Company Info */}
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={item.profile_photo || "https://via.placeholder.com/60"}
                    alt={item.company_name}
                    className="w-16 h-16 rounded-full object-cover border border-gray-300"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-green-600">{item.product_name}</p>
                    <p className="text-sm font-medium text-gray-700">{item.company_name}</p>
                    {item.contact_phone && <p className="text-sm text-gray-500">📞 {item.contact_phone}</p>}
                    <p className="text-sm text-gray-500">📍 {item.location}</p>
                  </div>
                </div>

                {/* Discount and countdown */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {/* Show discount badge only if not 'waiting' */}
                  {item.discount && item.discount !== "waiting" && (
                    <span className="text-sm font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
                      {item.discount}% OFF
                    </span>
                  )}

                  {/* waiting */}
                  {item.status === "waiting" && (
                    <span className="text-sm font-semibold bg-gray-200 text-gray-600 px-2 py-1 rounded">
                      ⏳ Waiting
                    </span>
                  )}

                  {/* to begin */}
                  {item.status === "to_begin" && (
                    <span className="text-sm font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {item.remainingToBegin} {item.remainingToBegin > 1 ? "days" : "day"} left to begin
                    </span>
                  )}

                  {/* active */}
                  {item.status === "active" && (
                    <>
                      {/* if we have a duration and remainingToEnd > 0 show days left to end */}
                      {item._endDate ? (
                        <span className="text-sm font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          {item.remainingToEnd > 0
                            ? `${item.remainingToEnd} ${item.remainingToEnd > 1 ? "days" : "day"} left to end`
                            : "Ends today"}
                        </span>
                      ) : (
                        // no duration provided -> ongoing
                        <span className="text-sm font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          ⚡ Ended
                        </span>
                      )}
                    </>
                  )}

                  {/* expired */}
                  {item.status === "expired" && (
                    <span className="text-sm font-semibold bg-red-100 text-red-700 px-2 py-1 rounded">
                      ❌ Discount expired
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

                {/* CTA */}
                <p className="text-sm text-gray-600 mt-auto">💬 Visit our Telegram to see the price</p>
               
              </div>
            ))}
          </div>
        )}
        
      </section>
      
    </div>
  );
};

export default Shops;
