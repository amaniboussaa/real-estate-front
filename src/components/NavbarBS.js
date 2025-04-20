import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Plus } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <Building2 size={24} className="me-2 text-primary" />
          <span className="fw-semibold text-dark fs-5">RealEstate</span>
        </Link>

        <div className="d-flex">
          <Link
            to="/"
            className={`btn btn-sm me-2 ${
              location.pathname === '/' 
                ? 'btn-outline-primary' 
                : 'btn-light text-dark border'
            }`}
          >
            Properties
          </Link>

          <Link
            to="/add-property"
            className={`btn btn-sm d-flex align-items-center ${
              location.pathname === '/add-property' 
                ? 'btn-outline-primary' 
                : 'btn-light text-dark border'
            }`}
          >
            <Plus size={16} className="me-1" />
            Add Property
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;