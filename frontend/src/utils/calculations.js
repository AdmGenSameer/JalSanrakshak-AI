// Calculation utilities for RWH assessment

export const calculatePotentialSavings = (harvestableWater, dwellers) => {
  const annualDemand = dwellers * 150 * 365; // liters per year
  return Math.min(harvestableWater, annualDemand);
};

export const calculateCollectionEfficiency = (roofType, roofAge) => {
  const baseEfficiency = {
    'Concrete': 0.8,
    'Metal': 0.9,
    'Tile': 0.75,
    'Asphalt': 0.7
  };

  let efficiency = baseEfficiency[roofType] || 0.75;
  
  // Reduce efficiency based on age
  if (roofAge > 20) {
    efficiency *= 0.8;
  } else if (roofAge > 10) {
    efficiency *= 0.9;
  }

  return Math.round(efficiency * 100) / 100;
};

export const calculateStorageEfficiency = (roofArea) => {
  // Storage efficiency based on roof area
  if (roofArea > 200) return 0.95;
  if (roofArea > 100) return 0.9;
  if (roofArea > 50) return 0.85;
  return 0.8;
};

export const calculateOverallEfficiency = (runoffCoeff, collectionEff, storageEff) => {
  return Math.round(runoffCoeff * collectionEff * storageEff * 100) / 100;
};

export const calculateEnvironmentalImpact = (harvestableWater) => {
  return {
    groundwaterRecharge: Math.round(harvestableWater * 0.7),
    co2Reduction: Math.round(harvestableWater * 0.0005 * 100) / 100, // kg CO2
    energySavings: Math.round(harvestableWater * 0.003 * 100) / 100 // kWh
  };
};

export const calculateFinancialProjection = (installationCost, annualSavings, years = 10) => {
  const projection = [];
  let cumulativeSavings = 0;

  for (let year = 0; year <= years; year++) {
    if (year === 0) {
      cumulativeSavings = -installationCost;
    } else {
      cumulativeSavings += annualSavings;
    }
    projection.push({
      year,
      cumulativeSavings: Math.round(cumulativeSavings)
    });
  }

  return projection;
};

export const formatNumber = (num, decimals = 0) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K';
  }
  return num.toFixed(decimals);
};

export const formatCurrency = (amount, currency = '₹') => {
  return `${currency} ${formatNumber(amount)}`;
};

export const generateGoogleEarthLink = (latitude, longitude) => {
  return `https://earth.google.com/web/search/${latitude},${longitude}`;
};

export const validateFormData = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (!data.location || data.location.trim().length < 3) {
    errors.location = 'Location must be at least 3 characters long';
  }

  if (!data.dwellers || data.dwellers < 1 || data.dwellers > 20) {
    errors.dwellers = 'Number of dwellers must be between 1 and 20';
  }

  if (!data.roof_area || data.roof_area < 10 || data.roof_area > 1000) {
    errors.roof_area = 'Roof area must be between 10 and 1000 square meters';
  }

  if (!data.open_space || data.open_space < 0 || data.open_space > 500) {
    errors.open_space = 'Open space must be between 0 and 500 square meters';
  }

  if (!data.roof_age || data.roof_age < 0 || data.roof_age > 50) {
    errors.roof_age = 'Roof age must be between 0 and 50 years';
  }
  
  if (!data.soil_type) {
    errors.soil_type = 'Soil type is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Sample data generators for development/testing
export const generateSampleRainfallData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(month => ({
    month,
    rainfall: Math.floor(Math.random() * 200) + 50
  }));
};

export const calculateInfiltrationRate = (soilType) => {
  // Infiltration rates in mm/hr based on soil type
  const infiltrationRates = {
    'Sandy': 20, // High infiltration
    'Loamy': 10, // Medium infiltration
    'Clay': 3,   // Low infiltration
    'Silt': 6,   // Medium-low infiltration
    'Rocky': 8   // Variable, using average
  };
  
  return infiltrationRates[soilType] || 8; // Default to medium if soil type not found
};

export const generateSampleResults = (userData) => {
  const annualRainfall = 800 + Math.random() * 400;
  const runoffCoeff = 0.7 + Math.random() * 0.2;
  const collectionEff = calculateCollectionEfficiency(userData.roof_type, userData.roof_age);
  const storageEff = calculateStorageEfficiency(userData.roof_area);
  const infiltrationRate = calculateInfiltrationRate(userData.soil_type);
  
  // Adjust harvestable water based on soil type infiltration
  const harvestableWater = Math.round(userData.roof_area * annualRainfall * runoffCoeff * collectionEff);
  
  // Determine recommended structure based on soil type
  let recommendedStructure = 'Underground Tank';
  if (userData.soil_type === 'Sandy') {
    recommendedStructure = 'Percolation Pit';
  } else if (userData.soil_type === 'Clay') {
    recommendedStructure = 'Surface Storage Tank';
  } else if (userData.soil_type === 'Loamy') {
    recommendedStructure = 'Recharge Well';
  }
  
  // Adjust installation cost based on soil type and recommended structure
  const baseCost = userData.roof_area * 150;
  let structureCost = 50000;
  if (recommendedStructure === 'Percolation Pit') {
    structureCost = 35000;
  } else if (recommendedStructure === 'Surface Storage Tank') {
    structureCost = 60000;
  } else if (recommendedStructure === 'Recharge Well') {
    structureCost = 45000;
  }
  
  const installationCost = Math.round(baseCost + structureCost);
  const annualSavings = Math.round(harvestableWater * 0.02);
  const paybackPeriod = Math.round(installationCost / annualSavings);
  
  return {
    annualRainfall,
    harvestableWater,
    recommendedStructure,
    installationCost,
    annualSavings,
    paybackPeriod,
    runoffCoeff,
    collectionEff,
    storageEff,
    infiltrationRate,
    overallEfficiency: calculateOverallEfficiency(runoffCoeff, collectionEff, storageEff),
    environmentalImpact: calculateEnvironmentalImpact(harvestableWater),
    aquiferType: userData.soil_type === 'Sandy' ? 'Unconfined' : 
                (userData.soil_type === 'Clay' ? 'Confined' : 'Semi-confined'),
    waterLevel: Math.round(Math.random() * 50 + 10),
    soilType: userData.soil_type
  };
};
