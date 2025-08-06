import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Search.css';
import Hamburger from './Hamburger';

const categories = [
  "Daily Discounts",
  "Weekly Discounts",
  "Entertainments",
  "Piyasa",
  "Dubi",
  "Bahir Dar",
  "Bole",
  "Adama",
  "Hawassa",
  "Mexico",
  "seatle",
  "Addis gebeya",
  "Mekelie",
  "jima",
  "berlin",
  "paris",
  "kanada"

  // "Daily Discounts",
  // "Weekly Discounts",
  // "Entertainments",
  // "Car Brands",
  // "Fashions",
  // "Real Estates",
  // "Computer & Electronics",
  // "Food & Drinks",
  // "Home & Appliances",
  // "Health & Beauty",
  // "Construction & Building Materials",
  // "Education and Services",
  // "Industrial Equipment",
  // "Agricultural & LiveStock",
  // "Repair & Maintainance",
  // "Event & Wedding",
  // "Services and Freelance"
//    Travel & Tourism

// Mobile & Accessories

// Sports & Outdoor Gear

// Books & Stationery

// Toys & Games

// Jewelry & Watches

// Finance & Insurance Services

// Baby & Kids Products

// Pet Supplies & Services

// Green & Eco-Friendly Products

// Medical & Pharmaceuticals
//     – Clinics, pharmacies, diagnostic centers, medical supplies.

// Logistics & Delivery Services
//     – Couriers, transport, freight, and delivery tracking.

// Legal & Consultancy Services
//     – Lawyers, business consultants, advisors, notary services.

// Cleaning & Sanitation Services
//     – Home, office, industrial cleaning, pest control.

// Telecommunication Service

// Art & Handicrafts
//     – Paintings, handmade goods, cultural items, crafts.

// Photography & Videography
//     – Event photography, studio services, drone filming.

// Furniture & Interior Design
//     – Home/office furniture, interior decorators, modular kitchens.

// Fitness & Sports Services
//     – Gyms, personal trainers, yoga, martial arts, sports coaching.

// Software & IT Services
// Security Services
//     – CCTV, alarm systems, guards, cybersecurity.

// Printing & Publishing
//     – Business cards, banners, book printing, publishing houses.

// Automotive Services
//     – Repairs, spare parts, detailing, car wash, rentals.

// Waste Management & Recycling
//     – Junk removal, recycling services, industrial waste handling.

// Human Resources & Staffing
//     – Recruitment, outsourcing, headhunting, payroll services.

// Energy & Utilities
//     – Solar panels, water supply, electricity providers, fuel.

// Marketplace & Classifieds
//     – Buy/sell platforms, local classifieds, auction services.

// Gaming & eSports
//     – Game development, tournaments, streaming, accessories.

// Tattoo & Piercing Studios
//     – Body art, cosmetic tattoos, professional piercing.

// Religious & Spiritual Services
// Elderly Care & Nursing Services
//     – Home care, nursing homes, assisted living, medical escorts.

// Rental Services
//     – Tools, party equipment, furniture, electronics, spaces.

// Event Planning & Decor
//     – Wedding planners, stage design, balloon & flower decor.

// Language & Translation Services
//     – Interpretation, document translation, subtitle services.

// Nonprofit & Charity Organizations

// Courier & Freight Services
//     – International shipping, local delivery, freight forwarding.

// Beauty Salons & Barbershops
//     – Haircuts, makeup, grooming, nail studios.

// Music & Instruments
//     – Stores, lessons, repair, instrument rentals.

// Coworking & Office Spaces
//     – Shared offices, meeting rooms, virtual addresses.

// Digital Marketing Services
//     – SEO, social media, email campaigns, ad management.

// Architecture & Engineering Services
//     – Drafting, 3D modeling, structural design, surveying.

// Antiques & Collectibles
//     – Vintage shops, auctions, memorabilia, rare finds.

// Craft Supplies & DIY Materials
//     – Art supplies, woodworking kits, DIY home projects.

// Public Relations & Media
//     – Press release services, influencers, media coverage.

// Mental Health & Wellness Services
//     – Therapy, counseling, mindfulness coaching, support groups.
// Home Security & Smart Systems
//     – Alarms, smart locks, surveillance, automation.

// Landscaping & Gardening Services
//     – Lawn care, garden design, plant nurseries.

// Podcasting & Audio Production
//     – Recording studios, editing, distribution, podcast services.

// Auction Houses & Estate Sales
//     – Art, antiques, real estate, liquidation sales.

// Stationery & Office Supplies
//     – Paper, pens, printers, filing systems, school supplies.

// Marine & Boating Services
//     – Boats, fishing gear, marine repairs, rentals.

// Virtual Events & Webinars
//     – Platforms, hosting, webinar marketing, live streaming.

// 3D Printing & Prototyping
//     – Custom models, manufacturing prototypes, product design.

// Vending Machines & Kiosks
//     – Food kiosks, product dispensers, smart vending tech.

// Rehabilitation & Physical Therapy
//     – Injury recovery, physiotherapy, occupational therapy.

// Influencer & Content Creation Services
//     – Brand ambassadors, video creators, social media partnerships.

// Drone Services
//     – Aerial photography, surveying, agriculture, inspections.

// Home Renovation & Remodeling
//     – Interior upgrades, kitchen/bathroom remodeling, contractors.

// Public Speaking & Coaching
//     – Motivational speakers, business coaches, leadership training.

// Ethnic & Cultural Goods
//     – Traditional wear, cultural foods, artisan items.

// Subscription Box Services
//     – Monthly food, fashion, book, or hobby boxes.

// Parking & Valet Services
//     – Event parking, private garages, valet attendants.

// Laundry & Dry Cleaning
//     – Pickup/drop-off laundry, ironing, eco-friendly cleaners.

// Fire Safety & Emergency Services
//     – Fire extinguishers, training, first aid, alarms.

// Crowdfunding & Investment Platforms
//     – Startup funding, peer-to-peer lending, donation portals.
// Pet Grooming & Veterinary Services
//     – Vets, grooming salons, pet clinics, emergency animal care.

// Ethical & Fair Trade Products
//     – Sustainable fashion, handmade goods, artisan cooperatives.

// Tattoo Removal & Cosmetic Services
//     – Laser removal, skin treatments, aesthetic clinics.

// Mobile App & Web Development
//     – Front-end, back-end, UX/UI design, maintenance services.

// Virtual Assistance & Admin Support
//     – Remote PAs, schedulers, executive support, task handling.

// Environmental & Sustainability Services
//     – Green consulting, carbon auditing, eco-certifications.

// Voice Over & Narration Services
//     – Audiobooks, commercials, dubbing, language localization.

// E-learning & Online Courses
//     – Platforms, tutors, educational content creators.

// ID & Printing Services
//     – Badges, ID cards, laminations, passport photos.

// Mobile Repair & Accessories
//     – Phone repairs, screen replacements, cases, chargers.
// Baby & Maternity Products
//     – Baby clothes, strollers, maternity wear, nursing items.

// Legal & Notary Services
//     – Law firms, paralegals, notary public, legal documents.

// Auction Bidding & Liquidation Services
//     – Bulk sales, repossessed goods, online bidding platforms.

// Local Tours & Travel Guides
//     – City tours, historical guides, adventure tours, travel planners.

// Funeral & Memorial Services
//     – Funeral homes, cremation, florals, memorial planning.

// Water Delivery & Purification Services
//     – Bottled water, filtration systems, coolers.

// Car Wash & Detailing
//     – Mobile car wash, interior detailing, wax & polish.

// Boarding & Daycare (Kids & Pets)
//     – Daycares, preschools, pet boarding, nanny services.
// Home Staging & Interior Styling
// EACH OF THEM HAVE IT'S OWN CATEGORY
];

const Search = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null); // Ref for the menu container

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleCategoryClick = (category) => {
    navigate(`/${category.toLowerCase()}`);
    closeMenu(); // Close menu after navigation
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="navigation2">
      <Hamburger isOpen={menuOpen} toggle={toggleMenu} />

      <div className="categories">
        {categories.map((cat, index) => (
          <button
            key={index}
            className="category-btn"
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {menuOpen && (
        <div className="detailed-menu" ref={menuRef}>
          <div className="menu-section">
            <ul>
              <li><Link to="/profile" onClick={closeMenu}>My Profile</Link></li>
              <li><Link to="/profile" onClick={closeMenu}>Favorites</Link></li>
              <li><Link to="/aboutus" onClick={closeMenu}>About Us</Link></li>
              <li><Link to="/announcements" onClick={closeMenu}>Announcements</Link></li>
              <li><Link to="/chat" onClick={closeMenu}>Want new buyers/sellers?</Link></li>
              <li><Link to="/weekly-discounts" onClick={closeMenu}>Want discounts?</Link></li>
              <li><Link to="/purchasehistory" onClick={closeMenu}>History</Link></li>
              <li><Link to="/logout" onClick={closeMenu}>sign out</Link></li>
              <li><Link to="/orders" onClick={closeMenu}>Orders</Link></li>
              <li><Link to="/whishlist" onClick={closeMenu}>Wishlist</Link></li>
              <li><Link to="/addresses" onClick={closeMenu}>Addresses</Link></li>
              <li><Link to="/paymentmethods" onClick={closeMenu}>Payment Methods</Link></li>
            </ul>
          </div>

          <div className="menu-section">
            <ul>
              <li>
                Categories
                <ul className="nested">
                  <li><Link to="/technologymethods" onClick={closeMenu}>Technology Methods</Link></li>
                  <li><Link to="/blog" onClick={closeMenu}>Did you know</Link></li>
                </ul>
              </li>
              <li><Link to="/newarrivals" onClick={closeMenu}>New products</Link></li>
              <li><Link to="/best-sellers" onClick={closeMenu}>Best Sellers</Link></li>
              <li><Link to="/dealsandoffers" onClick={closeMenu}>Deals & Offers</Link></li>
              <li><Link to="/brands" onClick={closeMenu}>Brands</Link></li>
            </ul>
          </div>

          <div className="menu-section">
            <ul>
              <li><Link to="/helpcenter" onClick={closeMenu}>Help Center</Link></li>
              <li><Link to="/contactus" onClick={closeMenu}>Contact Us</Link></li>
              {/* <li><Link to="/returns-refunds" onClick={closeMenu}>Returns & Refunds</Link></li>
              <li><Link to="/shippinginfo" onClick={closeMenu}>Shipping Info</Link></li>
              <li><Link to="/trackorder" onClick={closeMenu}>Track Order</Link></li> */}
            </ul>
          </div>
          <div className="menu-section">
            <ul>
              <li><Link to="/terms" onClick={closeMenu}>Terms & Conditions</Link></li>
              <li><Link to="/privacy" onClick={closeMenu}>Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="menu-section">
            <ul>
              <li><Link to="/language" onClick={closeMenu}>Language</Link></li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Search;
