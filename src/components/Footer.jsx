
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
    

        <div className="footer-about">
          <h3>CBN</h3>
          <p>
            Empowering local businesses and service providers by connecting them with customers across regions.
            Whether you're selling products, offering services, or looking for talent — we've got you covered.
          </p>
          <div className="contact-info">
            <p>📧 Email: animutalemeneh632gmail.com</p>
            <p>📍 Location: Worldwide Access</p>
            <p>📞 Phone: +251943453172</p>
          </div>
        </div>
      </div> 

      <div className="footer-bottom">
        <nav className="footer-nav">
          
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </nav>
        <p className="footer-copy">© 2025 customer-business-network. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
