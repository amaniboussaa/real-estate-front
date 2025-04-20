import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { addProperty } from '../services/propertyService';

const AddProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    price: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: null
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Property name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Price must be a positive number';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const newProperty = await addProperty(formData);
      navigate(`/propertys/${newProperty.id}`);
    } catch (err) {
      console.error('Error adding property:', err);
      setSubmitError('Failed to add property. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h2 className="h3 d-flex align-items-center">
          <Plus className="me-2" />
          Add New Property
        </h2>
        <p className="text-muted">Fill in the details to add a new property</p>
      </div>

      {submitError && (
        <div className="alert alert-danger" role="alert">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Property Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="e.g. Modern Apartment in City Center"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address *</label>
          <input
            type="text"
            id="address"
            name="address"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            placeholder="e.g. 123 Main Street, City, Country"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price (€) *</label>
          <input
            type="number"
            id="price"
            name="price"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            placeholder="e.g. 250000"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-outline-secondary me-2"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saving...
              </>
            ) : (
              'Save Property'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
