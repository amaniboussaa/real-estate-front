import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft, Building2 } from 'lucide-react';
import { getPropertyById } from '../services/propertyService';
import { formatCurrency } from '../utils/formatters';
import InvestmentCalculator from '../components/InvestmentCalculator';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const data = await getPropertyById(parseInt(id));
        setProperty(data);
      } catch (err) {
        console.error('Failed to fetch property:', err);
        setError('Failed to load property details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '16rem' }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="alert alert-danger" role="alert">
        <p>{error || 'Property not found'}</p>
        <button onClick={handleBack} className="btn btn-link mt-3">
          <ArrowLeft className="me-1" size={16} />
          Back to listings
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <button onClick={handleBack} className="btn btn-link mb-4">
        <ArrowLeft className="me-1" size={16} />
        Back to listings
      </button>

      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{property.name}</h2>
          <p className="text-muted d-flex align-items-center mb-2">
            <MapPin size={16} className="me-2" />
            {property.address}
          </p>
          <h4 className="text-primary fw-bold">{formatCurrency(property.price)}</h4>
        </div>
        <div>
        </div>
      </div>
      <InvestmentCalculator property={property} />
    </div>
  );
};

export default PropertyDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {Button,Card} from 'react-bootstrap';
// import { getPropertyById } from '../services/propertyService';
// import InvestmentCalculator from '../components/InvestmentCalculator';

// function PropertyDetails() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [property, setProperty] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//         console.log("data")
//       const fetchProperty = async () => {
//         if (!id) return;
        
//         try {
//           const data = await getPropertyById(parseInt(id));
//           console.log(data)
//           setProperty(data);
//         } catch (err) {
//           console.error('Failed to fetch property:', err);
//           setError('Failed to load property details. Please try again later.');
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchProperty();
//     }, [id]);

//     const handleBack = () => {
//         navigate(-1);
//       };
//       return (
//         <>
//           {loading ? (
//             <p>Loading...</p>
//           ) : error ? (
//             <p style={{ color: 'red' }}>{error}</p>
//           ) : property ? (
//             <>
//               <Card>
//                 <Card.Header>{property.name}</Card.Header>
//                 <Card.Body>
//                   <Card.Title>{property.price}</Card.Title>
//                   <Card.Text>{property.address}</Card.Text>
//                   <Button variant="primary" onClick={handleBack}>Back</Button>
//                 </Card.Body>
//               </Card>
//               <InvestmentCalculator property={property} />
//             </>
//           ) : (
//             <p>No property found.</p>
//           )}
//         </>
//       );
      
// }

// export default PropertyDetails