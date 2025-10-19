import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { FaTelegramPlane, FaTiktok } from 'react-icons/fa';

const MyPosts = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://djanagobackend-5.onrender.com/api/products/');
        const data = await response.json();

        if (user?.emailAddresses[0]?.emailAddress) {
          const userEmail = user.emailAddresses[0].emailAddress.toLowerCase();
          const filtered = data.filter(product => product.email?.toLowerCase() === userEmail);
          setProducts(filtered);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user]);

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.company_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await fetch(`https://djanagobackend-5.onrender.com/api/delete/products/${id}/`, {
        method: 'DELETE',
      });
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  // Start Editing
  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditData({
      product_name: product.product_name,
      company_name: product.company_name,
      description: product.description || '',
      location: product.location || '',
      discount: product.discount || '',
      profile_photo: null,
      product_photo: null,
    });
  };

  // Save Updates
  const handleSave = async (id) => {
    try {
      const formData = new FormData();

      formData.append('product_name', editData.product_name);
      formData.append('company_name', editData.company_name);
      formData.append('description', editData.description);
      formData.append('location', editData.location);
      formData.append('discount', editData.discount);

      if (editData.profile_photo) {
        formData.append('profile_photo', editData.profile_photo);
      }
      if (editData.product_photo) {
        formData.append('product_photo', editData.product_photo);
      }

      const response = await fetch(`https://djanagobackend-5.onrender.com/api/delete/products/${id}/`, {
        method: 'PATCH',
        body: formData,
      });

      const updatedProduct = await response.json();
      setProducts(products.map(p => p.id === id ? updatedProduct : p));
      setEditingProductId(null);
    } catch (err) {
      console.error('Error updating product:', err);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 w-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">My Posts</h2>

      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-semibold">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(item => {
            const allImages = [item.product_photo, ...(item.images || []).map(img => img.image)];
            const firstFourImages = allImages.slice(0, 4);
            const remainingImages = allImages.slice(4);

            const isEditing = editingProductId === item.id;

            return (
              <div key={item.id} className="bg-white rounded-lg shadow p-4 flex flex-col cursor-pointer">
                {/* Editable Fields */}
                <div className="flex flex-col gap-2 mb-2">
                  {isEditing ? (
                    <>
                      <input
                        className="border rounded px-2 py-1"
                        value={editData.product_name}
                        onChange={e => setEditData({ ...editData, product_name: e.target.value })}
                        placeholder="Product Name"
                      />
                      <input
                        className="border rounded px-2 py-1"
                        value={editData.company_name}
                        onChange={e => setEditData({ ...editData, company_name: e.target.value })}
                        placeholder="Company Name"
                      />
                      <textarea
                        className="border rounded px-2 py-1"
                        value={editData.description}
                        onChange={e => setEditData({ ...editData, description: e.target.value })}
                        placeholder="Description"
                      />
                      <input
                        className="border rounded px-2 py-1"
                        value={editData.location}
                        onChange={e => setEditData({ ...editData, location: e.target.value })}
                        placeholder="Location"
                      />
                      <input
                        className="border rounded px-2 py-1"
                        value={editData.discount}
                        onChange={e => setEditData({ ...editData, discount: e.target.value })}
                        placeholder="Discount"
                      />
                      {/* Profile Photo */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => setEditData({ ...editData, profile_photo: e.target.files[0] })}
                          className="mt-1 block w-full text-sm text-gray-700"
                        />
                        {editData.profile_photo && (
                          <img
                            src={URL.createObjectURL(editData.profile_photo)}
                            alt="Profile Preview"
                            className="w-20 h-20 object-cover rounded mt-1"
                          />
                        )}
                      </div>
                      {/* Product Photo */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Product Photo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => setEditData({ ...editData, product_photo: e.target.files[0] })}
                          className="mt-1 block w-full text-sm text-gray-700"
                        />
                        {editData.product_photo && (
                          <img
                            src={URL.createObjectURL(editData.product_photo)}
                            alt="Product Preview"
                            className="w-32 h-32 object-cover rounded mt-1"
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-semibold text-blue-600">{item.product_name}</p>
                      <p className="text-sm font-medium text-gray-700">{item.company_name}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <p className="text-sm text-gray-500">📍 {item.location}</p>
                      {item.discount && (
                        <span className="text-sm font-semibold bg-green-100 text-green-800 px-2 py-1 rounded">
                          {item.discount}% OFF
                        </span>
                      )}
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-2">
                  {isEditing ? (
                    <button
                      onClick={() => handleSave(item.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>

                {/* More Images */}
                {remainingImages.length > 0 && (
                  <button
                    className="mt-1 px-4 py-1 bg-gray-600 text-white rounded-full text-xs font-medium"
                    onClick={() => setExpandedProductId(expandedProductId === item.id ? null : item.id)}
                  >
                    {expandedProductId === item.id ? 'Less..' : 'More...'}
                  </button>
                )}

                {expandedProductId === item.id && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {remainingImages.map((src, idx) => (
                      <img key={idx} src={src} alt={`Extra ${idx}`} className="w-full h-28 object-cover rounded" />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
