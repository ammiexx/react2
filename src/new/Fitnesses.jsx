import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Nearby = () => {
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
        if (!response.ok) throw new Error("Failed to fetch products");
        let data = await response.json();

        // Filter for category "appliances" and verified = true
        data = data.filter(
          (item) => item.category === "appliances" && item.verified === true
        );

        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 text-[#2c3e50] font-sans w-full">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
        🏠 Beautify Your Home with Top Appliances ✨
      </h2>

      <section className="mb-12 w-full">
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-gray-200 rounded-xl h-40 p-4 flex gap-4 items-center"
              >
                <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">
            No home appliances found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {products.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  navigate("/nearby-detail", { state: { product: item } })
                }
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.01] cursor-pointer flex items-center p-4"
              >
                {/* Profile photo */}
                <img
                  src={item.profile_photo || "https://via.placeholder.com/60"}
                  alt={`${item.first_name} ${item.last_name}`}
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />

                {/* Info */}
                <div className="flex-1 flex justify-between items-center px-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold text-blue-600">
                      {item.product_name}
                    </p>
                    <p className="text-sm font-medium">{item.company_name}</p>
                    <p className="text-sm text-gray-600">📍 {item.location}</p>
                    {item.contact_phone && (
                      <p className="text-sm text-gray-600">
                        📞 {item.contact_phone}
                      </p>
                    )}
                  </div>
                  <span className="text-blue-600 font-bold text-lg">›</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Nearby;
