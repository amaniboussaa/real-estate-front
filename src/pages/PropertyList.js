import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { getAllProperties } from '../services/propertyService';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();
        setProperties(data);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setError('Failed to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-5">
        <Building2 size={48} className="text-secondary mb-3" />
        <h3 className="fw-bold">No properties found</h3>
        <p className="text-muted">Get started by adding a new property.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="h3 fw-bold text-dark">Property Listings</h1>
        <p className="text-muted">Browse our selection of properties for sale</p>
      </div>

      <div className="row">
        {properties.map((property) => (
          <div className="col-md-6 col-lg-4 mb-4" key={property.id}>
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
