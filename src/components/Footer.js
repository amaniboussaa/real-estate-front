import React from 'react';
import { Building2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-auto py-4">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-md-auto d-flex align-items-center mb-3 mb-md-0">
            <Building2 size={24} className="me-2 text-primary" />
            <span className="fw-semibold fs-5 text-white">RealEstate</span>
          </div>
          <div className="col-md-auto d-flex gap-3">
            <a href="#" className="text-light text-decoration-none hover-opacity">About</a>
            <a href="#" className="text-light text-decoration-none hover-opacity">Contact</a>
            <a href="#" className="text-light text-decoration-none hover-opacity">Privacy</a>
            <a href="#" className="text-light text-decoration-none hover-opacity">Terms</a>
          </div>
        </div>
        <div className="text-center mt-3 small">
          <p className="mb-0">&copy; {new Date().getFullYear()} RealEstate Real Estate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
