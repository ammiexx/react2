import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
const featuredForSale = [
  {
    id: 1,
    productName: 'Cordless Power Drill X200',
    companyName: 'Acme Tools Inc.',
    price: '$120.00',
    productPhoto: 'https://images.unsplash.com/photo-1752440284390-26d0527bbb9f?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    productName: 'Electric Lawn Mower 3000',
    companyName: 'Garden Pro Supplies',
    price: '$250.00',
    productPhoto: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    productName: '2020 Toyota Corolla',
    companyName: 'City Auto Traders',
    price: '$14,500.00',
    productPhoto: 'https://images.unsplash.com/photo-1753240810334-5d626bdc26ef?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    productName: 'Leather Sofa Set',
    companyName: 'Home Comforts',
    price: '$999.00',
    productPhoto: 'https://images.unsplash.com/photo-1750316096690-be3da4ccb338?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    productName: 'Canon DSLR Camera',
    companyName: 'PhotoHub Inc.',
    price: '$550.00',
    productPhoto: 'https://images.unsplash.com/photo-1752035682769-595f8358ac51?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    productName: 'Gaming Laptop RTX 4060',
    companyName: 'Tech World',
    price: '$1,300.00',
    productPhoto: 'https://plus.unsplash.com/premium_photo-1753401938596-4dcd95723c7b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1NXx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    productName: 'Men’s Leather Jacket',
    companyName: 'Urban Styles',
    price: '$180.00',
    productPhoto: 'https://plus.unsplash.com/premium_photo-1753365285087-8913c5206df3?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 8,
    productName: 'Queen Bed Frame & Mattress',
    companyName: 'DreamSleep Co.',
    price: '$850.00',
    productPhoto: 'https://images.unsplash.com/photo-1745488039955-e6e55fbcd419?q=80&w=385&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 9,
    productName: 'Smart LED TV 55”',
    companyName: 'VisionX Electronics',
    price: '$480.00',
    productPhoto: 'https://images.unsplash.com/photo-1753334479971-573a6e1e0bad?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 10,
    productName: 'Kitchen Appliance Set',
    companyName: 'CookSmart',
    price: '$399.00',
    productPhoto: 'https://images.unsplash.com/photo-1753295687822-b7785d55c24e?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 11,
    productName: 'Women’s Handbag Collection',
    companyName: 'Trendy Totes',
    price: '$120.00',
    productPhoto: 'https://plus.unsplash.com/premium_photo-1753158245780-5f9dc0659e14?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 12,
    productName: 'Mountain Bike TrailPro',
    companyName: 'Cyclo Adventures',
    price: '$899.00',
    productPhoto: 'https://images.unsplash.com/photo-1753416536123-23597cd1ce30?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];
const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="typing-text">
  <span className="typed-sentence">Purchase what you want, sell what you offer — your opportunity starts here.</span>
</h1>
        <p>Make your business grow and buy quality products</p>
        <div className="home-buttons">
          <Link to="/forsale" className="btn btn-primary">Sellers</Link>
          <Link to="/wanted" className="btn btn-secondary">Buyers</Link>
        </div>
      </header>
      <section className="featured-section">
        <h2>Featured Products for Sale</h2>
        <div className="featured-grid">
          {featuredForSale.map(item => (
            <div className="featured-item" key={item.id}>
              <img src={item.productPhoto} alt={item.productName} className="featured-photo" />
              <h3>{item.productName}</h3>
              <p>{item.companyName}</p>
              <p className="price">{item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;
