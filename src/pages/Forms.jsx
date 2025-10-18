import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser,useClerk } from '@clerk/clerk-react';
import { useEffect } from 'react';
import Select from "react-select";
const Form = () => {
  const [pendingProduct, setPendingProduct] = useState(null);
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const handleVideoChange = (e) => {
  const file = e.target.files[0]; // get selected file
  if (file) {
    const url = URL.createObjectURL(file); // create temporary URL
    const video = document.createElement('video'); // create video element
    video.src = url;
    video.onloadedmetadata = () => {
      if (video.duration > 30) { // check duration
        alert("Video must be 30 seconds or less.");
        e.target.value = null; // reset input
        setFormData(prev => ({ ...prev, product_video: null })); // reset state
      } else {
        setFormData(prev => ({ ...prev, product_video: file })); // store file
      }
      URL.revokeObjectURL(url); // free memory
    };
  }
};


  const discountOptions = [
  { value: '5', label: '5%' },
  { value: '10', label: '10%' },
  { value: '15', label: '15%' },
  { value: '20', label: '20%' },
  { value: '30', label: '30%' },
  { value: '50', label: '40%' },
  { value: '50', label: '50%' },
  { value: 'waiting', label: 'Waiting' },

];


 const categoryOptions = [
  { value: "men", label: "Men Fashions" },
  { value: "women", label: "Women Fashions" },
  { value: "homes", label: "Homes" },
  { value: "carbrands", label: "Car Brands" },
  { value: "foods", label: "Foods & Beverages" },
  { value: "appliances", label: "Home & Appliances" },
  { value: "health", label: "Health & Beauties" },
  { value: "events", label: "Events & Weddings" },
  { value: "entertainments", label: "Intertainments" },
  { value: "travels", label: "Travels" },
  { value: "holyday", label: "Holyday Discounts"},
  { value: "upcomming", label: "Upcomming Services" },
  { value: "repair", label: "Repair & Maintainance" },
  { value: "agricultural", label: "Agriculture & Livestock" },
  { value: "books", label: "Books & Stationary" },
  { value: "toys", label: "Toys & Games" },
  { value: "jewelry", label: "Jewelries" },
  { value: "insurances", label: "Finance & Insurances" },
  { value: "baby", label: "Baby & Kids products" },
  { value: "pet", label: "Pet Suplies & services" },
  { value: "green", label: "Green & Eco-friendly products" },
  { value: "medical", label: "Medical & Pharmaceuticals" },
  { value: "logistic", label: "Logistic & Delivery Services" },
  { value: "consultancy", label: "Legal & Consultancy Services" },
  { value: "cleaning", label: "Cleaning & Sanitation Services" },
  { value: "telecom", label: "Telecomunication Services" },
  { value: "art", label: "Art & Handicrafts" },
  { value: "photograpy", label: "Photograpy & Videograph" }, // backend spelling!
  { value: "design", label: "Furniture & Interior Design" },
  { value: "fitness", label: "Fitness & Sports Service" },
  { value: "software", label: "Software & IT services" },
  { value: "sercurity", label: "Security Services" }, // backend typo must match!
  { value: "printing", label: "Printing & Publishing" },
  { value: "automotive", label: "Automotive Services" },
  { value: "waste", label: "Waste Management & Recycling" },
  { value: "human", label: "Human Resources & Staffing" },
  { value: "energy", label: "Energy & Utilities" },
  { value: "gaming", label: "Gaming & eSports" },
  { value: "tatue", label: "Female fashions" }, // backend typo
  { value: "nursing", label: "Elderly Care & Nursing Services" },
  { value: "rental", label: "Rental Services" },
  { value: "decor", label: "Event Planning & Decor" },
  { value: "translation", label: "Language And Translation" },
  { value: "nonprofit", label: "Non Profit & Charity Organization" },
  { value: "freight", label: "Courier & Freight Services" },
  { value: "sallons", label: "Beauty Salons and Barbershops" }, // backend typo
  { value: "music", label: "Music & Instruments" },
  { value: "office", label: "Coworking & Office Spaces" },
  { value: "digital", label: "Digital Marketing Services" },
  { value: "architecture", label: "Architecture & Engineering Services" },
  { value: "mental", label: "Mental Health & Wellness Services" },
  { value: "homesecurity", label: "Home Security & Smart Homes" },
  { value: "land", label: "Landscaping and Gardening Services" },
  { value: "podcasting", label: "Podcasting & Audio Production" },
  { value: "stationary", label: "Stationary & Office Supplies" },
  { value: "marin", label: "Marine & Boating Services" },
  { value: "virtual", label: "Virtual Events and Webinars" },
  { value: "funding", label: "Crowd Funding And Investment Services" },
  { value: "elearning", label: "Elearning & Online Courses" },
  { value: "carwash", label: "Car Wash & Detailing" },
  { value: "admin", label: "Virtual Assistant & Admin Support" },
];

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
useEffect(() => {
  if (user) {
    // Check if we have a pending product in localStorage
    const savedProduct = localStorage.getItem('pendingProduct');
    if (savedProduct) {
      const productData = JSON.parse(savedProduct);
      postProduct(productData);
      localStorage.removeItem('pendingProduct'); // clear buffer
    }
  }
}, [user]);

  const [formData, setFormData] = useState({
    profile_photo:null,
    email: '',
    product_name: '',
    discount: '',
    company_name: '',
    description: '',
    category: '',
    location: '',
    product_video: null,
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
const postProduct = async (productData) => {
  setLoading(true);
  setSuccessMsg('');
  setErrorMsg('');

  const form = new FormData();
  Object.entries(productData).forEach(([key, value]) => {
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
    const response = await fetch(
      'https://djanagobackend-5.onrender.com/api/products/',
      {
        method: 'POST',
        body: form,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Backend error:', errorData);
      setErrorMsg('❌ Failed to submit: ' + JSON.stringify(errorData));
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }

    setSuccessMsg(
      '✅ Your post submitted successfully! Waiting for verification.'
    );
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
      discount_duration: '',
      images: [],
    });
  } catch (error) {
    console.error('Network or JS error:', error);
    setErrorMsg('❌ Network error. Please try again.');
    setTimeout(() => setErrorMsg(''), 2000);
  } finally {
    setLoading(false);
  }
};

 const handleSubmit = async (e) => {
  e.preventDefault();


  //    if (!formData.product_video) {
  //   setErrorMsg('❌ You must upload a product video (max 30 seconds).');
  //   setTimeout(() => setErrorMsg(''), 2000);
  //   return; // Stop form submission
  // }

  if (!formData.category) {
  setErrorMsg("❌ Please select a category.");
  setTimeout(() => setErrorMsg(""), 3000);
  return;
}

if (!formData.discount) {
  setErrorMsg("❌ Please select a discount.");
  setTimeout(() => setErrorMsg(""), 3000);
  return;
}

if (!formData.latitude || !formData.longitude) {
  setErrorMsg("❌ Please provide the precise location (latitude & longitude).");
  setTimeout(() => setErrorMsg(""), 3000);
  return;
}

 if (!formData.description) {
  setErrorMsg("❌ Please provide a description for your product.");
  setTimeout(() => setErrorMsg(""), 3000);
  return;
}

if (!formData.location) {
  setErrorMsg("❌ Please provide a location.");
  setTimeout(() => setErrorMsg(""), 3000);
  return;
}

 if (!formData.contact_telegram) {
  setErrorMsg("❌ Please provide a Telegram link.");
  setTimeout(() => setErrorMsg(""), 3000);
  return;
}

if (!formData.contact_phone) {
  setErrorMsg("❌ Please provide a phone number.");
  setTimeout(() => setErrorMsg(""), 3000);
  return;
}


  if (formData.images.length > 10) {
    setErrorMsg('❌ You can upload a maximum of 10 additional images.');
    setTimeout(() => setErrorMsg(''), 2000);
    return;
  }

  if (!user) {
    setPendingProduct(formData);  
    localStorage.setItem('pendingProduct', JSON.stringify(formData));
    setAuthWarning(true);
    return;
  }

  // Post directly if user exists
  await postProduct(formData);
};


  return (
    <div className="max-w-3xl mx-auto py-25 p-8 bg-gray-100 shadow-xl rounded-xl mt-10 border border-gray-200 relative">


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
          <label className="block text-gray-700 font-semibold mb-1">Item for sale/Service</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <div>
  <label className="block text-gray-700 font-semibold mb-1">Video less than 30 seconds</label>
  <input
    type="file"
    accept="video/*"
    onChange={handleVideoChange}
    className="w-full border px-4 py-2 rounded"
  />
</div>

{/* Profile Photo */}
<div>
  <label className="block text-gray-700 font-semibold mb-1">Logo</label>
 <input
  type="file"
  accept="image/*"
  name="profile_photo"
  onChange={handleImageChange}
  required
/>

</div>

        {/* Company Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Name Your Company</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:ring-2 ring-blue-300"
          />
        </div>
        {/* Discount */}
<div>
  <label className="block text-gray-700 font-semibold mb-1">Discount</label>
  <Select
    options={discountOptions}
    value={discountOptions.find(opt => opt.value === formData.discount)}
    onChange={(selected) =>
      setFormData(prev => ({ ...prev, discount: selected.value }))
    }
    placeholder="Select a discount..."
    isSearchable
    className="text-gray-700"
  />
</div>

{/* Discount Duration (in days) */}
<div>
  <label className="block text-gray-700 font-semibold mb-1">
    Discount Duration (in days)
  </label>
  <input
    type="number"
    name="discount_duration"
    min="1"
    max="30"
    value={formData.discount_duration}
    onChange={handleChange}
    placeholder="e.g., 7"
    className="w-full border px-4 py-2 rounded"
    required
  />
  <p className="text-sm text-gray-500 mt-1">
    The number of days this discount will stay active.
  </p>
</div>


      
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
            placeholder="Write your description about your product and service..."
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
          {/* <div>
            <label className="block text-gray-700 font-semibold mb-1">TikTok Link (optional)</label>
            <input
              type="url"
              name="contact_tick"
              value={formData.contact_tick}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div> */}
          {/* <div>
            <label className="block text-gray-700 font-semibold mb-1">website (optional)</label>
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
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Product/Service Image</label>
          <input
  type="file"
  name="product_photo"
  accept="image/*"
  onChange={handleImageChange}
  className="w-full"
  required/>
        </div>
        <div>
  <label className="block text-gray-700 font-semibold mb-1">
    Additional Images (optional, up to 6)
  </label>
  <input
    type="file"
    name="images"
    accept="image/*"
    multiple
    onChange={(e) => {
      const files = Array.from(e.target.files);

      setFormData((prev) => {
        const combined = [...prev.images, ...files];
        if (combined.length > 6) {
          alert("❌ You can upload a maximum of 6 images.");
          return { ...prev }; // don’t update if limit exceeded
        }
        return { ...prev, images: combined };
      });
    }}
    className="w-full border px-4 py-2 rounded"
  />

  {/* Optional preview of selected images */}
  {formData.images.length > 0 && (
    <div className="mt-3 grid grid-cols-3 gap-2">
      {formData.images.map((file, idx) => (
        <div key={idx} className="relative">
          <img
            src={URL.createObjectURL(file)}
            alt={`preview-${idx}`}
            className="h-24 w-full object-cover rounded"
            onLoad={(e) => URL.revokeObjectURL(e.target.src)} // cleanup memory
          />
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== idx),
              }))
            }
            className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )}
</div>


<div>
  


 
</div>
{(successMsg || errorMsg) && (
  <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow text-center
      ${successMsg ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
    {successMsg || errorMsg}
  </div>
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
          navigate('/login'); 
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

