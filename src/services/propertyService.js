const API_URL = process.env.REACT_APP_API_URL;
export const getAllProperties = async () => {
  try {
    const response = await fetch(`${API_URL}/propertys`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch properties: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

export const getPropertyById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/propertys/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch property: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching property with id ${id}:`, error);
    throw error;
  }
};

export const addProperty = async (property) => {
  try {
    const response = await fetch(`${API_URL}/propertys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(property),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to add property: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding property:', error);
    throw error;
  }
};

export const calculateInvestment = async (propertyId, request) => {
  try {
    const response = await fetch(`${API_URL}/propertys/${propertyId}/simulate-investment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to calculate investment: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error calculating investment:', error);
    throw error;
  }
};