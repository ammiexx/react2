import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuickLinks from './QuickLinks';
const categories = [
  {
    name: 'Fashions',
    image_url: 'https://images.unsplash.com/photo-1605581494291-317cf1f77ddf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/fashions',
  },
  {
    name: 'Computers & Electronics',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    path: '/electronic-materials',
  },
  {
    name: 'Homes',
    image_url: 'https://plus.unsplash.com/premium_photo-1680300960892-bd11b59b469b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/homes',
  },
  {
    name: 'Car Brands',
    image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
    path: '/car-brands',
  },
  {
    name: 'Food & Beverages',
    image_url: 'https://images.unsplash.com/photo-1614207279966-a46c93c0fbc2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9vZCUyMGFuZCUyMGJldmFyYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/food-and-beverages',
  },
  {
    name: 'Home and Appliances',
    image_url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGFwcGxpYW5jZXN8ZW58MHx8MHx8fDA%3D',
    path: '/home-appliances',
  },
  {
    name: 'Health & Beauty',
    image_url: 'https://images.unsplash.com/photo-1742201949674-a5084b01418c',
    path: '/health-and-beauties',
  },
  {
    name: 'Events & Weddings',
    image_url: 'https://images.unsplash.com/photo-1754149155224-24d7042ec22e',
    path: '/events-and-weddings',
  },
  {
    name: 'Entertainments',
    image_url: 'https://plus.unsplash.com/premium_photo-1683129679874-15966b2c1fdc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29uY2VydCUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/entertainments',
  },
  {
    name: 'Travel services',
    image_url: 'https://images.unsplash.com/photo-1754244774117-a27304d47959',
    path: '/travels',
  },
  {
    name: 'Repair And Maintenance products',
    image_url: 'https://plus.unsplash.com/premium_photo-1750449864279-341157c41bc8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    path: '/Repair_and_maintenace',
  },
  {
    name: 'Agriculture And Livestock products',
    image_url: 'https://plus.unsplash.com/premium_photo-1667860234741-0e500d0e5ba5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWdyaWN1bHR1cmUlMjBhbmQlMjBsaXZlc3RvY2slMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
    path: '/Agriculture_And_Livestock',
  },
  {
    name: 'Books & Stationaries materials',
    image_url: 'https://plus.unsplash.com/premium_photo-1733864775808-c7c1ccbe5422?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3MlMjBhbmQlMjBzdGF0aW9uYXJpZXN8ZW58MHx8MHx8fDA%3D',
    path: '/Books_And_Stationaries',
  },
  {
    name: 'Vidoes & Games products',
    image_url: 'https://plus.unsplash.com/premium_photo-1664910795422-527440cfce2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/Toys_And_Games',
  },
  {
    name: 'Jewelry products',
    image_url: 'https://images.unsplash.com/photo-1631698532383-97ffe7c223c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amV3ZWxlcmllc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/Jewelries',
  },
  {
    name: 'Finance & Insurances services',
    image_url: 'https://plus.unsplash.com/premium_photo-1661436432458-f7ca1a171410?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmluYW5jZSUyMGFuZCUyMGluc3VyYW5jZXxlbnwwfHwwfHx8MA%3D%3D',
    path: '/Finance_And_Insurances',
  },
  {
    name: 'Baby & Kids Products',
    image_url: 'https://images.unsplash.com/photo-1744424751775-63a0bae32a21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhYnklMjBhbmQlMjBraWRzJTIwcHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
    path: '/Babies_And_Kids_Products',
  },
  {
    name: 'Pet Supplies And Services',
    image_url: 'https://plus.unsplash.com/premium_photo-1663133568320-97c8c0d0c4ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGV0JTIwc3VwcGxpZXMlMjBhbmQlMjBzZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/Pet_Supplies_And_Services',
  },
  {
    name: 'Green And Eco-Friendly products materials',
    image_url: 'https://plus.unsplash.com/premium_photo-1711987229773-3832fca590cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z3JlZW4lMjBhbmQlMjBFY28lMjBGcmllbmRseSUyMHByb2R1Y3RzfGVufDB8fDB8fHww',
    path: '/Green_And_Ecofreindly_products',
  },
  {
    name: 'Medical And Pharmaceutical materials',
    image_url: 'https://plus.unsplash.com/premium_photo-1666299175827-59ca81fb2666?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWVkaWNhbCUyMGFuZCUyMHBoYXJtYWNldXRpY2Fsc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/Medical_And_Pharmaceuticals',
  },
  {
    name: 'Logistics And Delivery Services',
    image_url: 'https://images.unsplash.com/photo-1754765542024-c1320f23b75a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxvZ2lzdGljJTIwYW5kJTIwZGVsaXZlcnklMjBzZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/Logistics_And_Delivery_Services',
  },
  {
    name: 'Consultancy Services',
    image_url: 'https://images.unsplash.com/photo-1565688527174-775059ac429c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29uc3VsdGFuY3klMjBzZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/legal_And_Consultancy_Services',
  },
  {
    name: 'Cleaning And Sanitation materials',
    image_url: 'https://images.unsplash.com/photo-1579141132886-e86d831034ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2xlYW5pbmclMjBhbmQlMjBzYW5pdGF0aW9uJTIwc2VydmljZXN8ZW58MHx8MHx8fDA%3D',
    path: '/Cleaning_And_Sanitation_Services',
  },
  {
    name: 'Telecom Services',
    image_url: 'https://images.unsplash.com/photo-1697097156924-de4efa72afc8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZXRoaW90ZWxlY29tfGVufDB8fDB8fHww',
    path: '/Telecome_Services',
  },
  {
    name: 'Art & Handicrafts',
    image_url: 'https://images.unsplash.com/photo-1695747001769-15ac88863f90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFydCUyMGFuZCUyMGhhbmRpY3JhZnRzfGVufDB8fDB8fHww',
    path: '/Art_And_Handicrafts',
  },
  {
    name: 'Video & Photography materials',
    image_url: 'https://plus.unsplash.com/premium_photo-1684783848153-970ef340c10b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dmlkZW8lMjBhbmQlMjBwaG90b2dyYXBoaWVzfGVufDB8fDB8fHww',
    path: '/Video_And_Photography',
  },
  {
    name: 'Furniture & Interior Design materials',
    image_url: 'https://plus.unsplash.com/premium_photo-1670950413316-f501402ef0a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnVybml0dXJlJTIwYW5kJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D',
    path: '/Furniture_And_Interior_design',
  },
  {
    name: 'Fitness & Sports Services',
    image_url: 'https://images.unsplash.com/photo-1600026453239-1d702d3e5e19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvZHklMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/fitness_And_Sports_servies',
  },
  {
    name: 'Software & IT products',
    image_url: 'https://images.unsplash.com/photo-1598316560453-0246d4611979?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c29mdHdhcmUlMjBkZXZlbG9wZXJzfGVufDB8fDB8fHww',
    path: '/SoftWare_And_IT_Services',
  },
  {
    name: 'Digital Security products',
    image_url: 'https://images.unsplash.com/photo-1639503547276-90230c4a4198?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRpZ2l0YWwlMjBzZWN1cml0eSUyMHNlcnZpY2VzfGVufDB8fDB8fHww',
    path: '/Security_Services',
  },
  {
    name: 'Printing & Publishing materials',
    image_url: 'https://plus.unsplash.com/premium_photo-1682145489846-081721a9b272?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJpbnRpbmclMjBhbmQlMjBwdWJsaXNoaW5nfGVufDB8fDB8fHww',
    path: '/Printing_And_Publishing',
  },
  {
    name: 'Automotive products',
    image_url: 'https://plus.unsplash.com/premium_photo-1661299233465-ad4268ddb448?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXV0b21vdGl2ZSUyMHNlcnZpY2VzfGVufDB8fDB8fHww',
    path: '/Automotive_Services',
  },
  
  
  {
    name: 'Tatue And Piercing materials',
    image_url: 'https://plus.unsplash.com/premium_photo-1665454931497-1355f79c5f4d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGF0dWVzfGVufDB8fDB8fHww',
    path: '/Tatue_And_Piercing_Studios',
  },
  {
    name: 'Elderly & Nursing Services',
    image_url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fE51cnNpbmclMjBzZXJ2aWNlc3xlbnwwfHwwfHx8MA%3D%3D',
    path: '/Elderly_And_Nursing_Services',
  },
  {
    name: 'Rental Services',
    image_url: 'https://plus.unsplash.com/premium_photo-1661761197559-58493b11151b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVudGFsJTIwc2VydmljZXN8ZW58MHx8MHx8fDA%3D',
    path: '/Rental_Services',
  },
  {
    name: 'Event Planning & Decor materials',
    image_url: 'https://images.unsplash.com/photo-1585733254318-9bcc6d81584a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRlY29yYXRpb258ZW58MHx8MHx8fDA%3D',
    path: '/Event_planning_And_Decore',
  },
];

// 10 brands
const allBrands = [
  // { id: 'b1', name: 'Ovid real estate (10% off)', logo: 'https://th.bing.com/th/id/ODLS.A2450BEC-5595-40BA-9F13-D9EC6AB74B9F?w=32&h=32&qlt=90&pcl=fffffa&o=6&cb=thwsc4&pid=1.2', website: 'https://ovid-realestates.com/' },
  // { id: 'b2', name: 'Skyshine (20% off)', logo: 'https://assets.perfectdomain.com/_domainphoto/c/3/2/9/c3292bd0db3ac907585f47a0054182d5_l.jpg', website: 'https://www.samsung.com' },
  // { id: 'b3', name: 'Nike (20% off)', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg', website: 'https://www.nike.com' },
  // { id: 'b4', name: 'Sony(10% off)', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Sony_Logo.svg', website: 'https://www.sony.com' },
  // { id: 'b5', name: 'Adidas(10% off)', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg', website: 'https://www.adidas.com' },

];

const Category1 = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const firstRowBrands = allBrands.slice(firstRowIndex, firstRowIndex + 5);
  const [secondRowIndex, setSecondRowIndex] = useState(5);
  const secondRowBrands = allBrands.slice(secondRowIndex, secondRowIndex + 5);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
       <QuickLinks/>
       
        {/* Explore More Products Heading */}
<div className="text-center mt-4 mb-2">
  <h2 className="text-base font-medium text-gray-700">Explore More Products</h2>
</div>



        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">

          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow hover:shadow-md cursor-pointer overflow-hidden transition"
                onClick={() => navigate(cat.path)}
              >
                <img
                  src={`${cat.image_url}?w=400&h=300&auto=format`}
                  alt={cat.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category1;
