import React from 'react';
import { Link } from "react-router-dom";
const Footer = () => {
  const normalTextClass = "text-left text-sm text-[#888888]";
  const linkClass = "hover:text-[#6ec1e4] transition-colors";

  return (
    <footer id="footer" className="bg-gray-900 text-white py-2 text-center"
>
     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 sm:text-center md:text-left md:ml-10 lg:ml-20">


        {/* Logo 5xl → ~ 64rem (1024px).*/}
        <div className={`mb-2 ${normalTextClass}`}>
          <h1 className="text-3xl font-bold text-[#6ec1e4]">Knash</h1>
        </div>

        {/* Mission */}
        <div className={`mb-3 max-w-3xl ${normalTextClass} leading-relaxed`}>
          <p>
        Creating a shopping platform that helps customers to purchase what they need at the best value!
        </p>
        </div>

        {/* Social Icons */}
        <div className={`flex gap-11 mb-3 ${normalTextClass}`}>
          {/* Facebook */}
          <a
            href="https://facebook.com/animutalemneh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className={`${linkClass} text-2xl`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 24 24" className="w-7 h-7">
              <path
                d="M22 12a10 10 0 1 0-11.5 9.87v-7h-2v-3h2v-2.3c0-2 1.2-3 3-3 .9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.3 3h-1.9v7A10 10 0 0 0 22 12Z" />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="https://instagram.com/alemnehanimut"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`${linkClass} text-2xl`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24" className="w-7 h-7">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37a4 4 0 1 1-7.74 1.38 4 4 0 0 1 7.74-1.38z" />
              <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
            </svg>
          </a>
          {/* Telegram */}
          <a
            href="https://t.me/@ammiex"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className={`${linkClass} text-2xl`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 24 24" className="w-7 h-7">
              <path d="M21.04 3.5 3.88 10.42l4.54 1.56 1.75 5.38 2.93-4.6 4.92 3.6z" />
            </svg>
          </a>
          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@alemnehanimut"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className={`${linkClass} text-2xl`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 24 24" className="w-7 h-7">
              <path d="M9 3v12a4.5 4.5 0 1 0 4.5 4.5v-4.5h3V6H12v3.38a3 3 0 1 1-3-3V3Z" />
            </svg>
          </a>
          {/* Phone */}
          <a
            href="tel:+251943453172"
            aria-label="Phone"
            className={`${linkClass} text-2xl`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24" className="w-7 h-7">
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.33 12.33 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45 12.33 12.33 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
        </div>

        {/* Additional Links in 4 Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 text-left">

          
          <div>
            <h4 className="text-white font-semibold mb-2">Explore</h4>
          <ul className={normalTextClass + " space-y-1"}>
  <li>
    <Link to="/" className={linkClass}>
      All
    </Link>
  </li>
  <li>
    <Link to="/new-products" className={linkClass}>
      New Products
    </Link>
  </li>
  <li>
    <Link to="/upcoming offers" className={linkClass}>
      Upcoming Offers
    </Link>
  </li>

</ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Quick Links</h4>
           <ul className={normalTextClass + " space-y-1"}>
  <li>
    <Link to="/new advantages" className={linkClass}>
      New Offers
    </Link>
  </li>
  <li>
    <Link to="/weekly discounts" className={linkClass}>
      Weekly Discounts
    </Link>
  </li>
  <li>
    <Link to="/daily discounts" className={linkClass}>
      Daily Discounts
    </Link>
  </li>
  <li>
    <Link to="/holiday discounts" className={linkClass}>
      Holiday Discounts
    </Link>
  </li>
</ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Company</h4>
            <ul className={normalTextClass + " space-y-1"}>
 
<li>
  <Link to="/newoffers" className={linkClass}>
    New Offers
  </Link>
</li>
<li>
  <Link to="/helpcenter" className={linkClass}>
    Help Center
  </Link>
</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Sign Up</h4>
            <ul className={normalTextClass + " space-y-1"}>
              <li><Link to="/signup" className={linkClass}>Sign in</Link></li>
              <li><Link to="/login" className={linkClass}>Sign Up</Link></li>
              
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
