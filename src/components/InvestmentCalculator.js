import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TrendingUp, DollarSign, PercentIcon } from 'lucide-react';
import { calculateInvestment } from '../services/propertyService';
import { formatCurrency } from '../utils/formatters';

const InvestmentCalculator = ({ property }) => {
  const [amount, setAmount] = useState('10000');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSimulate = async (e) => {
    e.preventDefault();
    setError(null);

    const investmentAmount = parseFloat(amount);
    if (isNaN(investmentAmount) || investmentAmount <= 0) {
      setError('Please enter a valid positive investment amount');
      return;
    }

    setLoading(true);

    try {
      const result = await calculateInvestment(property.id, { investmentAmount });
      setResult(result);
    } catch (err) {
      setError('Failed to calculate investment. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h5 className="card-title d-flex align-items-center mb-4">
        <TrendingUp size={20} className="me-2 text-primary" />
        Investment Simulator
      </h5>

      <form onSubmit={handleSimulate}>
        <div className="mb-3">
          <label htmlFor="investmentAmount" className="form-label">
            Investment Amount
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <DollarSign size={16} />
            </span>
            <input
              type="number"
              className="form-control"
              id="investmentAmount"
              placeholder="Enter amount"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Calculating...' : 'Simulate Investment'}
        </button>
      </form>

      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-5">
          <div className="border rounded p-3 mb-3 bg-light">
            <h6 className="text-muted mb-1">Investment Amount</h6>
            <p className="fs-5 fw-semibold mb-0">{formatCurrency(result.investmentAmount)}</p>
          </div>

          <div className="border rounded p-3 mb-3 bg-primary bg-opacity-10">
            <h6 className="text-muted mb-1">Estimated Return</h6>
            <p className="fs-5 fw-semibold text-primary mb-0">{formatCurrency(result.estimatedReturn)}</p>
          </div>

          <div className="border rounded p-3 d-flex justify-content-between align-items-center bg-info bg-opacity-10">
            <div>
              <h6 className="text-muted mb-1">Annual Yield</h6>
              <p className="fs-5 fw-semibold text-info mb-0">{result.annualYield}%</p>
            </div>
            <PercentIcon size={32} className="text-info" />
          </div>
        </div>
      )}
    </div>
  );
};

InvestmentCalculator.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default InvestmentCalculator;
