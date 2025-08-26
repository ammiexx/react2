import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import BackButton from '../components/BackButton';

const stripePromise = loadStripe('pk_test_51RxBXuC2J5esJHJB3deOeOQ3ZhxYhyM9TT4yjZvE7cSgCQGD3BW2CY0rFFTUmgvLZDgoLRA0QYUNPoWpVqweBgUh00jhNFUdVm');

const MyPosts = () => {
  const [fieldEditing, setFieldEditing] = useState({});
  const [products, setProducts] = useState([]);
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomedImage, setZoomedImage] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({});
const startEditingField = (productId, fieldName, currentValue) => {
  setEditingProduct(productId);
  setFieldEditing({ [fieldName]: true });
  setEditFormData({ [fieldName]: currentValue });
};

const cancelFieldEdit = () => {
  setEditingProduct(null);
  setFieldEditing({});
  setEditFormData({});
};

  useEffect(() => {
    fetch('https://djanagobackend-5.onrender.com/api/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleCheckout = async (product) => {
    const stripe = await stripePromise;

    const response = await fetch('http://djanagobackend-5.onrender.com/backend/create-checkout-session/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: product.product_name, price: product.price }),
    });

    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) console.error(result.error.message);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://djanagobackend-5.onrender.com/api/products/${id}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(prev => prev.filter(product => product.id !== id));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
const handleEdit = (product) => {
  setEditingProduct(product.id);
  setEditFormData({
    product_name: product.product_name || '',
    description: product.description || '',
    price: product.price || '',
    category: product.category || '',
    condition: product.condition || '',
    location: product.location || '',
    contact_telegram: product.contact_telegram || '',
    contact_tick: product.contact_tick || '',
    web_site: product.web_site || '',
    contact_phone: product.contact_phone || '',
  });
};


  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleUpdateSubmit = async (e, productId) => {
  e.preventDefault();

  const fieldToUpdate = Object.keys(editFormData)[0];
  const value = editFormData[fieldToUpdate];

  try {
    const formData = new FormData();
    formData.append(fieldToUpdate, value);

    const response = await fetch(`https://djanagobackend-5.onrender.com/api/products/${productId}/`, {
      method: 'PATCH', // use PATCH to update partial fields
      body: formData,
    });

    if (response.ok) {
      const updated = await response.json();
      setProducts(prev =>
        prev.map(product => (product.id === productId ? updated : product))
      );
      cancelFieldEdit();
    } else {
      console.error('Update failed');
    }
  } catch (error) {
    console.error('Error updating product:', error);
  }
};


  const toggleExpand = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  const filteredProducts = products.filter(product =>
    product.category === 'fashions' &&
    (
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="max-w-[1200px] mx-auto my-10 px-5 text-[#2c3e50] font-sans">
      <BackButton className="md:hidden" />

      <section className="mb-12">
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="search" className="text-xl mb-2 font-bold text-[#2c3e50]">
            🎯 <strong>Make your personal impression higher by dressing well:</strong> 👀 💡
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search what you want to buy..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[60%] max-w-[400px] px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-8">
          {filteredProducts.map(item => {
            const allImages = [item.product_photo, ...(item.images || []).map(img => img.image)];
            const firstFourImages = allImages.slice(0, 4);
            const remainingImages = allImages.slice(4);

            return (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow transition-transform hover:scale-[1.01] flex flex-col self-start">
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2 p-2 bg-gray-100 border-b border-gray-200 rounded-md">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.profile_photo || 'https://via.placeholder.com/60'}
                      alt={`${item.first_name} ${item.last_name}`}
                      className="w-9 h-9 rounded-full object-cover border border-gray-300"
                    />
                    <p className="text-sm font-semibold text-[#2c3e50]">{item.company_name}</p>
                  </div>
                  {item.contact_phone && (
                    <p className="text-sm text-gray-600">📞 {item.contact_phone}</p>
                  )}
                  <p className="text-xs text-gray-600">📍 <strong>Location:</strong> {item.location}</p>
                </div>

                <div className="grid grid-cols-2 gap-1 mt-2 max-w-[700px]">
                  {firstFourImages.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Image ${idx}`}
                      className="w-[150px] h-[100px] object-cover border border-gray-300 rounded cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => setZoomedImage(src)}
                    />
                  ))}
                </div>

                <h6 className="text-lg font-bold text-center text-[#2c3e50] mt-2 mb-2">
                  {item.product_name}
                </h6>

                {remainingImages.length > 0 && (
                  <button
                    className="mt-3 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full text-sm font-semibold shadow hover:from-blue-700 hover:to-blue-800 transition"
                    onClick={() => toggleExpand(item.id)}
                  >
                    {expandedProductId === item.id ? 'Hide' : 'More...'}
                  </button>
                )}

                {expandedProductId === item.id && (
                  <>
                    <div className="w-full h-[200px] overflow-hidden rounded-md mb-4">
                      <img
                        src={item.product_photo}
                        alt={item.product_name}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => setZoomedImage(item.product_photo)}
                      />
                    </div>

                    <div className="text-sm text-gray-700 leading-relaxed mt-2 space-y-1">
                    </div>

                    {editingProduct === item.id ? (
                      <form onSubmit={(e) => handleUpdateSubmit(e, item.id)} className="mt-4 space-y-2">
  <div className="mb-1">
  <strong>Product Name:</strong>{' '}
  {editingProduct === item.id && fieldEditing.product_name ? (
    <form onSubmit={(e) => handleUpdateSubmit(e, item.id)} className="inline">
      <input
        type="text"
        name="product_name"
        value={editFormData.product_name}
        onChange={handleEditChange}
        className="border rounded px-1 py-0.5"
      />
      <button type="submit" className="ml-2 text-green-600">✅</button>
      <button type="button" onClick={cancelFieldEdit} className="ml-1 text-gray-500">❌</button>
    </form>
  ) : (
    <>
      {item.product_name}{' '}
      <button
        onClick={() => startEditingField(item.id, 'product_name', item.product_name)}
        className="text-blue-600 text-sm ml-2"
      >
        ✏️ Edit
      </button>
    </>
  )}
</div>


  {/* Description */}
<div className="mb-1">
  <strong>Description:</strong>{' '}
  {editingProduct === item.id && fieldEditing.description ? (
    <form onSubmit={(e) => handleUpdateSubmit(e, item.id)} className="inline">
      <textarea
        name="description"
        value={editFormData.description}
        onChange={handleEditChange}
        className="border rounded px-1 py-0.5"
        rows="2"
      />
      <button type="submit" className="ml-2 text-green-600">✅</button>
      <button type="button" onClick={cancelFieldEdit} className="ml-1 text-gray-500">❌</button>
    </form>
  ) : (
    <>
      {item.description}{' '}
      <button
        onClick={() => startEditingField(item.id, 'description', item.description)}
        className="text-blue-600 text-sm ml-2"
      >
        ✏️ Edit
      </button>
    </>
  )}
</div>
 <input
  type="file"
  name="product_photo"
  accept="image/*"
  onChange={(e) => setEditFormData(prev => ({
    ...prev,
    product_photo: e.target.files[0],
  }))}
  className="w-full px-3 py-2 border rounded-md"
/>


  {/* Category */}
<div className="mb-1">
  <strong>Category:</strong>{' '}
  {editingProduct === item.id && fieldEditing.category ? (
    <form onSubmit={(e) => handleUpdateSubmit(e, item.id)} className="inline">
      <select
        name="category"
        value={editFormData.category}
        onChange={handleEditChange}
        className="border rounded px-1 py-0.5"
      >
        <option value="">Select</option>
        <option value="fashions">Fashions</option>
        <option value="electronics">Electronics</option>
        <option value="homes">Homes</option>
      </select>
      <button type="submit" className="ml-2 text-green-600">✅</button>
      <button type="button" onClick={cancelFieldEdit} className="ml-1 text-gray-500">❌</button>
    </form>
  ) : (
    <>
      {item.category}{' '}
      <button
        onClick={() => startEditingField(item.id, 'category', item.category)}
        className="text-blue-600 text-sm ml-2"
      >
        ✏️ Edit
      </button>
    </>
  )}
</div>

  {/* Location */}
<div className="mb-1">
  <strong>Location:</strong>{' '}
  {editingProduct === item.id && fieldEditing.location ? (
    <form onSubmit={(e) => handleUpdateSubmit(e, item.id)} className="inline">
      <input
        type="text"
        name="location"
        value={editFormData.location}
        onChange={handleEditChange}
        className="border rounded px-1 py-0.5"
      />
      <button type="submit" className="ml-2 text-green-600">✅</button>
      <button type="button" onClick={cancelFieldEdit} className="ml-1 text-gray-500">❌</button>
    </form>
  ) : (
    <>
      {item.location}{' '}
      <button
        onClick={() => startEditingField(item.id, 'location', item.location)}
        className="text-blue-600 text-sm ml-2"
      >
        ✏️ Edit
      </button>
    </>
  )}
</div>
  
{/* Telegram */}
<div className="mb-1">
  <strong>Telegram:</strong>{' '}
  {editingProduct === item.id && fieldEditing.contact_telegram ? (
    <form onSubmit={(e) => handleUpdateSubmit(e, item.id)} className="inline">
      <input
        type="url"
        name="contact_telegram"
        value={editFormData.contact_telegram}
        onChange={handleEditChange}
        className="border rounded px-1 py-0.5"
      />
      <button type="submit" className="ml-2 text-green-600">✅</button>
      <button type="button" onClick={cancelFieldEdit} className="ml-1 text-gray-500">❌</button>
    </form>
  ) : (
    <>
      {item.contact_telegram}{' '}
      <button
        onClick={() => startEditingField(item.id, 'contact_telegram', item.contact_telegram)}
        className="text-blue-600 text-sm ml-2"
      >
        ✏️ Edit
      </button>
    </>
  )}
</div>
 {/* TikTok */}
<div className="mb-1">
  <strong>TikTok:</strong>{' '}
  {editingProduct === item.id && fieldEditing.contact_tick ? (
    <form onSubmit={(e) => handleUpdateSubmit(e, item.id)} className="inline">
      <input
        type="url"
        name="contact_tick"
        value={editFormData.contact_tick}
        onChange={handleEditChange}
        className="border rounded px-1 py-0.5"
      />
      <button type="submit" className="ml-2 text-green-600">✅</button>
      <button type="button" onClick={cancelFieldEdit} className="ml-1 text-gray-500">❌</button>
    </form>
  ) : (
    <>
      {item.contact_tick}{' '}
      <button
        onClick={() => startEditingField(item.id, 'contact_tick', item.contact_tick)}
        className="text-blue-600 text-sm ml-2"
      >
        ✏️ Edit
      </button>
    </>
  )}
</div>

 {/* Website */}
<div className="mb-1">
  <strong>Website:</strong>{' '}
  {editingProduct === item.id && fieldEditing.web_site ? (
    <form onSubmit={(e) => handleUpdateSubmit(e, item.id)} className="inline">
      <input
        type="url"
        name="web_site"
        value={editFormData.web_site}
        onChange={handleEditChange}
        className="border rounded px-1 py-0.5"
      />
      <button type="submit" className="ml-2 text-green-600">✅</button>
      <button type="button" onClick={cancelFieldEdit} className="ml-1 text-gray-500">❌</button>
    </form>
  ) : (
    <>
      {item.web_site}{' '}
      <button
        onClick={() => startEditingField(item.id, 'web_site', item.web_site)}
        className="text-blue-600 text-sm ml-2"
      >
        ✏️ Edit
      </button>
    </>
  )}
</div>

 {/* Contact Phone */}
<div className="mb-1">
  <strong>Contact Phone:</strong>{' '}
  {editingProduct === item.id && fieldEditing.contact_phone ? (
    <form onSubmit={(e) => handleUpdateSubmit(e, item.id)} className="inline">
      <input
        type="text"
        name="contact_phone"
        value={editFormData.contact_phone}
        onChange={handleEditChange}
        className="border rounded px-1 py-0.5"
      />
      <button type="submit" className="ml-2 text-green-600">✅</button>
      <button type="button" onClick={cancelFieldEdit} className="ml-1 text-gray-500">❌</button>
    </form>
  ) : (
    <>
      {item.contact_phone}{' '}
      <button
        onClick={() => startEditingField(item.id, 'contact_phone', item.contact_phone)}
        className="text-blue-600 text-sm ml-2"
      >
        ✏️ Edit
      </button>
    </>
  )}
</div>

  <div className="flex gap-3">
    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      ✅ Save
    </button>
    <button type="button" onClick={() => setEditingProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
      ❌ Cancel
    </button>
  </div>
</form>

                    ) : (
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-[9999] cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          <img src={zoomedImage} alt="Zoomed" className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg transform scale-105 transition" />
        </div>
      )}
    </div>
  );
};

export default MyPosts;
