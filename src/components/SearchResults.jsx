import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get("query") || "";
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://djanagobackend-5.onrender.com/api/products/");
        if (!res.ok) throw new Error("No internet connection!");
        const data = await res.json();

        const matches = data.filter((p) =>
          [p.product_name, p.company_name, p.location]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase())
        );

        setProducts(data);
        setFiltered(matches);
      } catch (err) {
        setError(err.message);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 text-[#2c3e50] font-sans w-full">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Search Results for: <span className="text-blue-600">{query}</span>
      </h2>

      <section className="mb-12 w-full">
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {loading ? (
          // Skeleton loader like Nearby
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-gray-200 rounded-lg h-32 flex items-center justify-start p-4"
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
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white px-2 py-3 rounded-lg shadow transition-transform hover:scale-[1.01] flex items-center cursor-pointer w-full"
                onClick={() =>
                  navigate("/nearby-detail", { state: { product: item } })
                }
              >
                {/* Profile / Product image */}
                <img
                  src={item.product_photo || "https://via.placeholder.com/60"}
                  alt={item.product_name}
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />

                {/* Info row */}
                <div className="flex-1 flex justify-between items-center px-4">
                  <div className="flex flex-wrap items-center gap-6">
                    <p className="text-sm font-semibold text-blue-500">
                      {item.product_name}
                    </p>
                    <p className="text-sm font-semibold">{item.company_name}</p>
                    <p className="text-sm text-gray-600">📍 {item.location}</p>
                    {item.contact_phone && (
                      <p className="text-sm text-gray-600">
                        📞 {item.contact_phone}
                      </p>
                    )}
                  </div>
                  <div className="text-blue-600 font-bold">&gt;</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchResults;
