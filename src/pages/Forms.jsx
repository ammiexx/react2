import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    profile_photo:null,
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

     setSuccessMsg('✅ Product submitted successfully!');
setTimeout(() => setSuccessMsg(''), 2000);

      setFormData({
        profile_photo: null,
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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📦 Add your Product</h2>

      

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded focus:ring-2 ring-blue-300"
          />
        </div>
{/* Profile Photo */}
<div>
  <label className="block text-gray-700 font-semibold mb-1">Company Logo</label>
  <input
  type="file"
  accept="image/*"
  name="profile_photo"
  onChange={handleImageChange}
/>

</div>

        {/* Company Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Company Name</label>
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
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded bg-white"
          >
            <option value="">Select a category</option>
<option value="fashions">Fashions</option>
<option value="electronics">Electronics</option>
<option value="homes">Homes</option>
<option value="carbrands">Car Brands</option>
<option value="foods">Foods & Beverages</option>
<option value="appliances">Home & Appliances</option>
<option value="health">Health & Beauties</option>
<option value="events">Events & Weddings</option>
<option value="entertainments">Intertainments</option>
<option value="travels">Travels</option>
<option value="daily">Daily Discounts</option>
<option value="weekly">Weekly Discounts</option>
<option value="new">New Advantages</option>
<option value="newoffers">New Offers</option>
<option value="upcomming">Upcomming Services</option>
<option value="repair">Repair & Maintainance</option>
<option value="agricultural">Agriculture & Livestock</option>
<option value="books">Books & Stationary</option>
<option value="toys">Toys & Games</option>
<option value="jewelry">Jewelries</option>
<option value="insurances">Finance & Insurances</option>
<option value="baby">Baby & Kids products</option>
<option value="pet">Pet Suplies & services</option>
<option value="green">Green & Eco-friendly products</option>
<option value="medical">Medical & Pharmaceuticals</option>
<option value="logistic">logistic & Delivery Services</option>
<option value="consustancy">Legal & Consultancy Services</option>
<option value="cleaning">Cleaning & Sanitation Services</option>
<option value="telecom">Telecomunication Services</option>
<option value="art">Art & Handicrafts</option>
<option value="photograpy">Photograpy & Videograph</option>
<option value="design">Furniture & Interior Design</option>
<option value="fitness">Fitness & Sports Service</option>
<option value="software">Software & IT services</option>
<option value="sercurity">Security Services</option>
<option value="printing">Printing & publishing</option>
<option value="automotive">Automotive Services</option>
<option value="waste">Waste Management & Recycling </option>
<option value="Human">Human Resources & staffing</option>
<option value="energy">Energy & Utilities</option>
<option value="gaming">Gaming & eSports</option>
<option value="tatue">Tatto And Piercing Studios</option>
<option value="nursing">Elderly Care & Nursing Services</option>
<option value="rental">Rental Services</option>
<option value="decor">Event Planning & Decor</option>
<option value="translation">Language And Translation</option>
<option value="nonprofit">Non Profit & Charity Organization</option>
<option value="freight">Courier & Freight Services</option>
<option value="sallons">Beauty Sallons and Barbershops</option>
<option value="music">Music & Instruments</option>
<option value="office">Coworking & Office Spaces</option>
<option value="digital">Digital Marketing Services</option>
<option value="architecture">Architecture & Engineering Services</option>
<option value="mental">Mental Health & Wellness Services</option>
<option value="homesecurity">Home Securty & Smart Homes</option>
<option value="land">Land Escaping and Gardeing services</option>
<option value="podcasting">podcasting & Audio Production</option>
<option value="stationary">Stationary & Office Supplieis</option>
<option value="marin">Marine & boating Services</option>
<option value="virtual">Virtual Events and Webinars</option>
<option value="funding">Croud Funding And Investment Services</option>
<option value="elearing">Elearning & online Cources</option>
<option value="carwash">Car Wash & Detailing</option>
<option value="admin">Virtual Assistant & Admin Support</option>
        
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          ></textarea>
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
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
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Website</label>
            <input
              type="url"
              name="web_site"
              value={formData.web_site}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
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

  {formData.images.map((image, index) => (
    <div key={index} className="mb-2">
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
    </div>
  ))}

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

