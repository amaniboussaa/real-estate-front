import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MapPin } from 'lucide-react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../utils/formatters';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/propertys/${property.id}`);
  };
  
  return (
    <div 
      className="card shadow-sm mb-4 cursor-pointer" 
      onClick={handleClick}
      style={{ transition: 'all 0.3s ease', transform: 'scale(1)' }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div className="position-relative">
        {property.imageUrl ? (
          <img 
            src={property.imageUrl} 
            alt={property.name}
            className="card-img-top"
            style={{ height: '200px', objectFit: 'cover' }}
          />
        ) : (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '200px', backgroundColor: '#e0e0e0' }}>
            <Home size={48} className="text-muted" />
          </div>
        )}
        <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-50 p-3">
          <span className="text-white fs-5 fw-bold">{formatCurrency(property.price)}</span>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title text-truncate">{property.name}</h5>
        <div className="d-flex align-items-center text-muted mb-3">
          <MapPin size={16} className="me-2" />
          <span className="text-truncate" style={{ maxWidth: 'calc(100% - 20px)' }}>{property.address}</span>
        </div>
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default PropertyCard;
