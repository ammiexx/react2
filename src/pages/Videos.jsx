import React, { useEffect, useState } from "react";

// 🔹 Skeleton Loader Component
const SkeletonCard = () => (
  <div className="animate-pulse bg-gray-800 rounded-2xl p-3 w-full max-w-sm mx-auto">
    <div className="bg-gray-700 h-72 rounded-xl mb-3"></div>
    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
  </div>
);

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`https://djanagobackend-5.onrender.com/api/products/`);
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">🎬 Featured Product Videos</h1>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          {videos.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Video */}
              <div className="relative">
                {item.product_video ? (
                  <video
                    src={item.product_video}
                    controls
                    className="w-full h-72 object-cover"
                  />
                ) : (
                  <div className="h-72 bg-gray-700 flex items-center justify-center text-gray-400">
                    No video available
                  </div>
                )}

                {item.discount && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-md">
                    {item.discount}% OFF
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="p-4">
                <p className="text-gray-300 text-sm line-clamp-3">
                  {item.description || "No description available."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
