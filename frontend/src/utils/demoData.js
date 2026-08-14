// Demo data for testing the application without backend

export const demoUserData = {
  name: "Rajesh Kumar",
  location: "Mumbai, Maharashtra",
  dwellers: 4,
  roof_area: 120,
  open_space: 30,
  roof_type: "Concrete",
  roof_age: 8,
  latitude: 19.0760,
  longitude: 72.8777
};

export const demoResults = {
  annualRainfall: 1200,
  harvestableWater: 86400, // 86.4 KL per year
  recommendedStructure: "Underground Tank",
  installationCost: 125000,
  annualSavings: 18500,
  paybackPeriod: 7,
  runoffCoeff: 0.8,
  collectionEff: 0.85,
  storageEff: 0.9,
  overallEfficiency: 0.612,
  environmentalImpact: {
    groundwaterRecharge: 60480,
    co2Reduction: 43.2,
    energySavings: 259.2
  },
  aquiferType: "Alluvial",
  waterLevel: 25,
  soilType: "Sandy Loam"
};

export const demoRainfallData = [
  { month: 'Jan', rainfall: 5 },
  { month: 'Feb', rainfall: 8 },
  { month: 'Mar', rainfall: 15 },
  { month: 'Apr', rainfall: 18 },
  { month: 'May', rainfall: 45 },
  { month: 'Jun', rainfall: 520 },
  { month: 'Jul', rainfall: 680 },
  { month: 'Aug', rainfall: 580 },
  { month: 'Sep', rainfall: 280 },
  { month: 'Oct', rainfall: 35 },
  { month: 'Nov', rainfall: 12 },
  { month: 'Dec', rainfall: 2 }
];

// System types and their characteristics
export const systemTypes = {
  'Underground Tank': {
    costPerSqM: 150,
    baseCost: 50000,
    efficiency: 0.9,
    maintenance: 'Low',
    lifespan: '20-25 years',
    description: 'Concrete underground storage tank with filtration system'
  },
  'Above Ground Tank': {
    costPerSqM: 100,
    baseCost: 30000,
    efficiency: 0.8,
    maintenance: 'Medium',
    lifespan: '15-20 years',
    description: 'Polyethylene or fiberglass above-ground tank'
  },
  'Modular System': {
    costPerSqM: 200,
    baseCost: 75000,
    efficiency: 0.95,
    maintenance: 'Low',
    lifespan: '25-30 years',
    description: 'Modular concrete blocks with advanced filtration'
  }
};

// Regional rainfall data (simplified)
export const regionalRainfall = {
  'Mumbai': { annual: 1200, monsoonMonths: [6, 7, 8, 9] },
  'Delhi': { annual: 650, monsoonMonths: [6, 7, 8] },
  'Chennai': { annual: 1400, monsoonMonths: [6, 7, 8, 10, 11] },
  'Bangalore': { annual: 950, monsoonMonths: [6, 7, 8, 9, 10] },
  'Hyderabad': { annual: 800, monsoonMonths: [6, 7, 8, 9] },
  'Pune': { annual: 850, monsoonMonths: [6, 7, 8, 9] }
};

// Water quality standards
export const waterQualityStandards = {
  pH: { min: 6.5, max: 8.5, unit: '' },
  TDS: { min: 0, max: 500, unit: 'ppm' },
  hardness: { min: 0, max: 300, unit: 'ppm' },
  chloride: { min: 0, max: 250, unit: 'ppm' },
  fluoride: { min: 0, max: 1.5, unit: 'ppm' },
  nitrate: { min: 0, max: 45, unit: 'ppm' }
};

// Maintenance schedules by system type
export const maintenanceSchedules = {
  'Underground Tank': [
    { task: 'Inspect and clean gutters', frequency: 'Monthly', season: 'All' },
    { task: 'Check first flush diverter', frequency: 'Monthly', season: 'Pre-monsoon' },
    { task: 'Clean tank (internal)', frequency: 'Annually', season: 'Summer' },
    { task: 'Replace pre-filters', frequency: 'Quarterly', season: 'Post-monsoon' },
    { task: 'Test water quality', frequency: 'Bi-annually', season: 'All' }
  ],
  'Above Ground Tank': [
    { task: 'Inspect tank exterior', frequency: 'Monthly', season: 'All' },
    { task: 'Clean gutters and pipes', frequency: 'Monthly', season: 'Pre-monsoon' },
    { task: 'Check pump and fittings', frequency: 'Quarterly', season: 'All' },
    { task: 'Replace filters', frequency: 'Every 6 months', season: 'All' },
    { task: 'Clean tank interior', frequency: 'Annually', season: 'Summer' }
  ],
  'Modular System': [
    { task: 'System performance check', frequency: 'Monthly', season: 'Monsoon' },
    { task: 'Clean collection system', frequency: 'Bi-monthly', season: 'All' },
    { task: 'Replace filtration media', frequency: 'Annually', season: 'Summer' },
    { task: 'Professional inspection', frequency: 'Annually', season: 'Pre-monsoon' }
  ]
};
