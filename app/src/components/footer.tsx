   import React from 'react';

    const Footer = () => {
      return (
        <footer>
          <div className="footer-content">
            <div>&copy; {new Date().getFullYear()} The Bulge Open. All rights reserved.</div>
          </div>
        </footer>
      );
    };

    export default Footer;