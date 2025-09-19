import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Skeleton box component
const SkeletonBox = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

const SearchResults = () => {
  const query = useQuery().get("query") || "";
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://djanagobackend-5.onrender.com/api/products/"
        );
        const data = await res.json();
        setProducts(data);

        const matches = data.filter((p) =>
          [p.product_name, p.company_name, p.location]
            .join(" ")
            .toLowerCase()
            .includes(query.toLowerCase())
        );
        setFiltered(matches);
      } catch (err) {
        console.error("Error fetching products:", err);
        setFiltered([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Search Results for: {query}</h2>

      {loading ? (
        // Skeleton loader
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="p-4">
              <SkeletonBox className="h-32 w-full mb-2" />
              <SkeletonBox className="h-5 w-3/4 mb-1" />
              <SkeletonBox className="h-4 w-1/2 mb-1" />
              <SkeletonBox className="h-4 w-1/3" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p>No products found.</p>
      ) : (
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {filtered.map((item) => (
    <div
      key={item.id}
      className="p-4 rounded shadow hover:shadow-md cursor-pointer" 
      onClick={() =>
        navigate("/nearby-detail", { state: { product: item } })
      }
    >
      <img
        src={item.product_photo || "https://via.placeholder.com/150"}
        alt={item.product_name}
        className="h-32 w-full object-cover rounded"
      />
      <h3 className="mt-2 font-semibold">{item.product_name}</h3>
      <p className="text-gray-600">{item.company_name}</p>
      <p className="text-sm text-gray-500">📍 {item.location}</p>
      
      {/* View More text */}
      <p className="mt-2 font-bold text-blue-600 hover:underline">
        View More...
      </p>
    </div>
  ))}
</div>

      )}
    </div>
  );
};

export default SearchResults;
