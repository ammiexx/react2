import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";

const DAY_MS = 1000 * 60 * 60 * 24;

/* ================= UI META MAPS ================= */

const ADDITIONAL_TIPS_META = {
  coming: {
    label: "🚧 Coming Soon",
    className: "bg-indigo-100 text-indigo-800",
  },
  open: {
    label: "🟢 We Are Open",
    className: "bg-emerald-100 text-emerald-800",
  },
  prize: {
    label: "🎁 Prize",
    className: "bg-pink-100 text-pink-800",
  },
  bonus: {
    label: "🎉 Bonus",
    className: "bg-purple-100 text-purple-800",
  },
  dubie: {
    label: "🔥 Dubie",
    className: "bg-orange-100 text-orange-800",
  },
  only_discount: {
    label: "💸 Only Discount",
    className: "bg-gray-100 text-gray-700",
  },
};

const FOR_WHOM_META = {
  everybody: "👥 Everybody",
  teachers: "👨‍🏫 Teachers",
  students: "🎓 Students",
  teenagers: "🧑 Teenagers",
  elders: "👴 Elders",
  disables: "♿ Disabled",
  special: "🌟 Special Needs",
  holyday: "🎄 Holiday",
};

/* ================= CONSTANT MESSAGES ================= */

const MESSAGES = {
  noInternet:
    "⚠️ Unable to connect. Please check your internet connection and try again.",
  noProducts:
    "🚀 No products or services found in this category yet. Be the first to showcase your business here!",
  loadingTagline: "Loading amazing deals and offers...",
  generalTagline:
    "✨ Discover products and services from trusted local businesses.",
};

/* ================= COMPONENT ================= */

const Shops = ({ category, title }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://djanagobackend-5.onrender.com/api/products/"
        );
        if (!response.ok) throw new Error("network");

        let data = await response.json();

        data = data.filter(
          (item) => item.category === category && item.verified === true
        );

        const processed = data.map((item) => {
          const now = new Date();
          const postedDate = item.date_posted
            ? new Date(item.date_posted)
            : new Date();

          const startOffsetDays = Number(item.discount_start_date) || null;
          const durationDays = Number(item.discount_duration) || null;

          let startDate = postedDate;
          if (startOffsetDays !== null) {
            startDate = new Date(
              postedDate.getTime() + startOffsetDays * DAY_MS
            );
          }

          let endDate = null;
          if (durationDays !== null) {
            endDate = new Date(startDate.getTime() + durationDays * DAY_MS);
          }

          const remainingToBegin =
            startDate > now ? Math.ceil((startDate - now) / DAY_MS) : 0;

          const remainingToEnd =
            endDate && endDate > now ? Math.ceil((endDate - now) / DAY_MS) : 0;

          let status = "waiting";
          if (item.discount === "waiting") status = "waiting";
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
      } catch {
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
        {error === "network" && (
          <p className="text-center text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg mb-6">
            {MESSAGES.noInternet}
          </p>
        )}

        {loading && (
          <p className="text-center text-gray-500 mb-4">
            {MESSAGES.loadingTagline}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-gray-600 text-lg font-medium bg-gray-100 border border-gray-200 py-5 rounded-xl shadow-sm">
            {MESSAGES.noProducts}
          </p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-transform hover:scale-105 p-5 cursor-pointer flex flex-col border border-gray-100"
                onClick={() =>
                  navigate("/nearby-detail", { state: { product: item } })
                }
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={item.profile_photo || "https://via.placeholder.com/60"}
                    alt={item.company_name}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-green-600">
                      {item.product_name}
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {item.company_name}
                    </p>
                    <p className="text-sm text-gray-500">📍 {item.location} </p>
                    <p className="text-sm text-gray-500">
                      📞 {item.contact_phone}{" "}
                    </p>

                    {item.for_whom && (
                      <p className="text-xs text-gray-600 mt-1">
                        🎯 {FOR_WHOM_META[item.for_whom]}
                      </p>
                    )}
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.discount && item.status !== "waiting" && (
                    <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded font-semibold">
                      {item.discount}% OFF
                    </span>
                  )}

                  {item.additional_tips &&
                    ADDITIONAL_TIPS_META[item.additional_tips] && (
                      <span
                        className={`text-sm px-2 py-1 rounded font-semibold ${
                          ADDITIONAL_TIPS_META[item.additional_tips].className
                        }`}
                      >
                        {ADDITIONAL_TIPS_META[item.additional_tips].label}
                      </span>
                    )}

                  {item.status === "to_begin" && (
                    <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded font-semibold">
                      {item.remainingToBegin} day(s) to begin
                    </span>
                  )}

                  {item.status === "active" && item._endDate && (
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded font-semibold">
                      {item.remainingToEnd} day(s) left
                    </span>
                  )}

                  {item.status === "expired" && (
                    <span className="bg-red-100 text-red-700 text-sm px-2 py-1 rounded font-semibold">
                      ❌ Expired
                    </span>
                  )}
                </div>

                {/* Contact */}
                {item.contact_telegram && (
                  <a
                    href={item.contact_telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition text-sm mb-2 w-fit"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaTelegramPlane /> Telegram
                  </a>
                )}

                <p className="text-xs text-gray-600 mt-auto">
                  💬 Visit our Telegram for latest offers
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
