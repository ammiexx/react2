import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import Select from "react-select";

const Form = () => {
  const categories = [
  "Fashions", "Electronics", "Homes", "Car Brands", "Foods & Beverages",
  "Home & Appliances", "Health & Beauties", "Events & Weddings",
  "Intertainments", "Travels", "Daily Discounts", "Weekly Discounts",
  "New Advantages", "New Offers", "Upcomming Services", "Repair & Maintainance",
  "Agriculture & Livestock", "Books & Stationary", "Toys & Games", "Jewelries",
  "Finance & Insurances", "Baby & Kids products", "Pet Suplies & services",
  "Green & Eco-friendly products", "Medical & Pharmaceuticals",
  "Logistic & Delivery Services", "Legal & Consultancy Services",
  "Cleaning & Sanitation Services", "Telecomunication Services",
  "Art & Handicrafts", "Photograpy & Videograph",
  "Furniture & Interior Design", "Fitness & Sports Service",
  "Software & IT services", "Security Services", "Printing & Publishing",
  "Automotive Services", "Waste Management & Recycling",
  "Human Resources & Staffing", "Energy & Utilities", "Gaming & eSports",
  "Tattoo And Piercing Studios", "Elderly Care & Nursing Services",
  "Rental Services", "Event Planning & Decor", "Language And Translation",
  "Non Profit & Charity Organization", "Courier & Freight Services",
  "Beauty Salons and Barbershops", "Music & Instruments",
  "Coworking & Office Spaces", "Digital Marketing Services",
  "Architecture & Engineering Services", "Mental Health & Wellness Services",
  "Home Security & Smart Homes", "Landscaping and Gardening Services",
  "Podcasting & Audio Production", "Stationary & Office Supplies",
  "Marine & Boating Services", "Virtual Events and Webinars",
  "Crowd Funding And Investment Services", "Elearning & Online Courses",
  "Car Wash & Detailing", "Virtual Assistant & Admin Support"
];

const categoryOptions = categories.map((c) => ({
  value: c.toLowerCase(),
  label: c,
}));

  const { user } = useUser();
const [authWarning, setAuthWarning] = useState(false);

useEffect(() => {
  if (user) {
    setFormData(prev => ({
      ...prev,
      email: user.emailAddresses[0]?.emailAddress || '',
    }));
  }
}, [user]);

  const [formData, setFormData] = useState({
    profile_photo:null,
    email: '',
    product_name: '',
    company_name: '',
    description: '',
    category: '',
    location: '',
    latitude: '',
    longitude: '',
    contact_telegram: '',
    contact_tick: '',
    web_site: '',
    contact_phone: '',
    product_photo: null,
    images: [],

  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleImageChange = (e) => {
  const { name, files } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: files[0],
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
  if (formData.images.length < 5 || formData.images.length > 10) {
  setErrorMsg('❌ You must upload between 5 and 10 additional images.');
  setLoading(false);
  return;
}
if (!formData.email) {
  setAuthWarning(true);
  setLoading(false);
  return;
}

    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    const form = new FormData();
 Object.entries(formData).forEach(([key, value]) => {
  if (key === 'images') {
    value.filter((img) => img instanceof File).forEach((img) => {
      form.append('uploaded_images', img);
    });
  } else if (value instanceof File) {
    form.append(key, value);
  } else if (typeof value === 'string' && value.trim() !== '') {
    form.append(key, value);
  }
});


    try {
      const response = await fetch('https://djanagobackend-5.onrender.com/api/products/', {
        method: 'POST',
        body: form,
      });

      if (!response.ok) throw new Error('Failed to submit');

     setSuccessMsg('✅ Your post submitted successfully! Waiting for admin approval.');
setTimeout(() => setSuccessMsg(''), 4000);

      setFormData({
        profile_photo: null,
         email: user?.emailAddresses[0]?.emailAddress || '', 
        product_name: '',
        company_name: '',
        description: '',
        category: '',
        location: '',
        contact_telegram: '',
        contact_tick: '',
        web_site: '',
        contact_phone: '',
        product_photo: null,
        images: [],
      });
    } catch (error) {
      setErrorMsg('❌ Error submitting product. Please try again.');
setTimeout(() => setErrorMsg(''), 2000);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-100 shadow-xl rounded-xl mt-10 border border-gray-200">

      <div className="text-center mb-8">
  <h1 className="text-3xl font-bold text-blue-800">🚀 Promote Your Product</h1>
  <p className="text-gray-600 mt-2">
    Fill in the details below to get your product listed in front of thousands of viewers.
  </p>
  <hr className="mt-4 border-gray-300" />
</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Item for sale</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>
{/* Profile Photo */}
<div>
  <label className="block text-gray-700 font-semibold mb-1">Capela/Your photo/Company Logo</label>
  <input
  type="file"
  accept="image/*"
  name="profile_photo"
  onChange={handleImageChange}
/>
</div>

        {/* Company Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">your company</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:ring-2 ring-blue-300"
          />
        </div>
        {/* Category */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Category</label>
       <Select
  options={categoryOptions}
  value={categoryOptions.find((opt) => opt.value === formData.category)}
  onChange={(selected) =>
    setFormData((prev) => ({ ...prev, category: selected.value }))
  }
  placeholder="Search or select a category..."
  isSearchable
  className="text-gray-700"
/>

        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Description</label>
          <textarea
            name="description"
            rows="2"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          ></textarea>
        </div>

       {/* Location (Text) */}
<div>
  <label className="text-xl font-semibold text-gray-700 mt-10 mb-4 border-b pb-1">Location</label>
  <input
    type="text"
    name="location"
    value={formData.location}
    onChange={handleChange}
    placeholder="Addis ababa-> bole->Friendship building-> floor-3->office X"
    className="w-full border px-4 py-2 rounded"
  />
</div>

{/* Precise Location Picker */}
<div className="mt-4">
  <label className="block text-gray-700 font-semibold mb-1">Precise Location</label>
  <div className="flex gap-2">
    <input
      type="text"
      name="latitude"
      value={formData.latitude}
      onChange={handleChange}
      placeholder="Latitude"
      className="w-1/2 border px-4 py-2 rounded"
      readOnly
    />
    <input
      type="text"
      name="longitude"
      value={formData.longitude}
      onChange={handleChange}
      placeholder="Longitude"
      className="w-1/2 border px-4 py-2 rounded"
      readOnly
    />
  </div>

  <button
    type="button"
    onClick={() => {
      // Get browser geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          setFormData((prev) => ({
            ...prev,
            latitude: pos.coords.latitude.toFixed(6),
            longitude: pos.coords.longitude.toFixed(6),
          }));
        }, () => {
          alert("❌ Unable to fetch your location.");
        });
      } else {
        alert("❌ Geolocation not supported by this browser.");
      }
    }}
    className="mt-2 px-4 py-1 bg-blue-200 rounded hover:bg-blue-300"
  >
    📍 Use My Current Location
  </button>
</div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Telegram Link</label>
            <input
              type="url"
              name="contact_telegram"
              value={formData.contact_telegram}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">TikTok Link</label>
            <input
              type="url"
              name="contact_tick"
              value={formData.contact_tick}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          {/* <div>
            <label className="block text-gray-700 font-semibold mb-1">Website</label>
            <input
              type="url"
              name="web_site"
              value={formData.web_site}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div> */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
            <input
              type="text"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
        </div>

        {/* Main Product Image */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Main Product Image</label>
          <input
  type="file"
  name="product_photo"
  accept="image/*"
  onChange={handleImageChange}
  className="w-full"
  required
/>

        </div>

{/* Additional Images (Dynamic) */}
<div>
  <label className="block text-gray-700 font-semibold mb-1">
    Additional Images (Min: 5, Max: 10)
  </label>

 <div className="flex flex-col space-y-4">

  {formData.images.map((image, index) => (
    <div key={index} className="flex-shrink-0 w-32">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          const updatedImages = [...formData.images];
          updatedImages[index] = file;
          setFormData(prev => ({
            ...prev,
            images: updatedImages,
          }));
        }}
        className="w-full"
      />
      {/* Optional: preview thumbnail of selected image */}
      {image && typeof image !== 'string' && (
        <img
          src={URL.createObjectURL(image)}
          alt={`preview-${index}`}
          className="mt-2 w-full h-20 object-contain rounded"
          onLoad={e => URL.revokeObjectURL(e.target.src)} // Clean up memory
        />
      )}
    </div>
  ))}
</div>


  {formData.images.length < 10 && (
    <button
      type="button"
      onClick={() =>
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, null],
        }))
      }
      className="mt-2 px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
    >
      ➕ Add More
    </button>
  )}

  <p className="text-sm text-gray-600 mt-1">
    {formData.images.filter(Boolean).length} image(s) selected out of {formData.images.length}
  </p>
</div>


{/* Messages near the submit button */}
{successMsg && (
  <p className="text-green-600 text-center mb-4">{successMsg}</p>
)}
{errorMsg && (
  <p className="text-red-600 text-center mb-4">{errorMsg}</p>
)}

{authWarning && (
  <div className="text-red-600 text-center text-sm mb-4 bg-red-50 border border-red-300 rounded p-2 relative">
    <span>
      ⚠️ Account not created. Please{' '}
      <button
        onClick={() => {
          if (!navigator.onLine) {
            alert('❌ No internet connection. Please check your connection and try again.');
            return;
          }
          setAuthWarning(false);
          setTimeout(() => {
            window.location.href = '/login'; // or use navigate('/signup') if using React Router
          }, 300);
        }}
        className="text-blue-600 underline hover:text-blue-800 transition duration-200"
      >
        sign up
      </button>
    </span>
  </div>
)}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

