import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import BackButton from '../components/BackButton';
import { useUser } from '@clerk/clerk-react';
import { useNavigate, useLocation } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51RxBXuC2J5esJHJB3deOeOQ3ZhxYhyM9TT4yjZvE7cSgCQGD3BW2CY0rFFTUmgvLZDgoLRA0QYUNPoWpVqweBgUh00jhNFUdVm');

const MyPosts = () => {
  const [productPostedMsg, setProductPostedMsg] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const [loadingRedirect, setLoadingRedirect] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();  
  const { user } = useUser(); 
  const [fieldEditing, setFieldEditing] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ add loading state
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomedImage, setZoomedImage] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const startEditingField = (productId, fieldName, currentValue) => {
    setEditingProduct(productId);
    setFieldEditing(prev => ({ ...prev, [fieldName]: true }));
    setEditFormData(prev => ({ ...prev, [fieldName]: currentValue }));
  };

  const cancelFieldEdit = () => {
    setEditingProduct(null);
    setFieldEditing({});
    setEditFormData({});
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://djanagobackend-5.onrender.com/api/products/');
        const data = await response.json();

        if (user && user.emailAddresses[0]?.emailAddress) {
          const userEmail = user.emailAddresses[0].emailAddress;
          const filtered = data.filter(
            product => product.email?.toLowerCase() === userEmail.toLowerCase()
          );
          setProducts(filtered);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // ✅ stop loading
      }
    };

    fetchProducts();
  }, [user]);

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 text-[#2c3e50] font-sans">
      <section className="mb-12">
        <div className="flex flex-col items-center mb-6"></div>
        <div className="flex flex-col gap-8">
          {/* ✅ Skeleton Loading */}
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow animate-pulse flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))
          ) : (
            filteredProducts.map(item => {
              const allImages = [item.product_photo, ...(item.images || []).map(img => img.image)];
              const firstFourImages = allImages.slice(0, 4);
              const remainingImages = allImages.slice(4);

              return (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow transition-transform hover:scale-[1.01] flex flex-col self-start">
                  {/* your existing product content here */}
                  <div className="flex flex-col gap-2 mb-2 p-2 bg-gray-100 border-b border-gray-200 rounded-md">
                    <div className="flex items-center gap-2">
                      <img
                        src={item.profile_photo || 'https://via.placeholder.com/60'}
                        alt={`${item.first_name} ${item.last_name}`}
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                      <p className="text-sm font-semibold text-[#2c3e50]">{item.company_name}</p>
                    </div>
                    {item.contact_phone && (
                      <p className="text-sm text-gray-600">📞 {item.contact_phone}</p>
                    )}
                    <p className="text-xs text-gray-600">
                      📍 <strong>Location:</strong> {item.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.product_name}
                    </p>
                  </div>
                  {remainingImages.length > 0 && (
                    <button
                      className="mt-1 px-4 py-1 w-[100px] bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full text-xs font-medium shadow hover:from-blue-700 hover:to-blue-800 transition self-start"
                      onClick={() => setExpandedProductId(expandedProductId === item.id ? null : item.id)}
                    >
                      {expandedProductId === item.id ? 'Less..' : 'More...'}
                    </button>
                  )}
                  {/* rest of your product expansion/edit UI */}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default MyPosts;
