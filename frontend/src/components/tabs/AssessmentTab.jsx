import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

import UserInputForm from '../UserInputForm';
import MetricsCard from '../MetricsCard';
import MonthlyRainfallChart from '../charts/MonthlyRainfallChart';
import { useAppContext } from '../../context/useAppContext';

const AssessmentTab = () => {
  const { state } = useAppContext();
  const { user_data } = state;
  const results = user_data?.results;

  return (
    <Box>
      <UserInputForm />
      
      {state.calculation_done && results && (
        <>
          <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3, mt: 4 }}>
            📊 Assessment Results
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <MetricsCard
                title="Harvestable Water"
                value={results.harvestableWater}
                unit="L/year"
                color="primary"
                icon="💧"
                description="Annual rainwater that can be harvested"
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <MetricsCard
                title="Recommended Structure"
                value={results.recommendedStructure}
                color="secondary"
                icon="🏠"
                description="Best suited RWH system for your site"
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <MetricsCard
                title="Installation Cost"
                value={results.installationCost}
                unit="₹"
                color="warning"
                icon="💰"
                description="Estimated total implementation cost"
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <MetricsCard
                title="Payback Period"
                value={results.paybackPeriod}
                unit="years"
                color="success"
                icon="⏰"
                description="Time to recover investment"
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Site Characteristics
              </Typography>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
                borderRadius: 1
              }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Soil Type:</strong> {results.soilType}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Aquifer Type:</strong> {results.aquiferType}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Water Depth:</strong> {results.waterLevel} feet
                </Typography>
                <Typography variant="body2">
                  <strong>Annual Rainfall:</strong> {Math.round(results.annualRainfall)} mm
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <MonthlyRainfallChart />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AssessmentTab;
