import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
  LinearProgress
} from '@mui/material';

import { useAppContext } from '../../context/useAppContext';
import WaterBalanceChart from '../charts/WaterBalanceChart';
import EfficiencyGauge from '../charts/EfficiencyGauge';
import { formatNumber } from '../../utils/calculations';

const ResultsTab = () => {
  const { state } = useAppContext();
  const { user_data } = state;
  const results = user_data?.results;

  if (!results) {
    return null;
  }

  const technicalSpecs = {
    'Tank Capacity': `${Math.round(results.harvestableWater/1000)} KL`,
    'Collection Area': `${user_data.roof_area} sq m`,
    'First Flush Diverter': 'Required',
    'Filtration System': 'Multi-stage filtration',
    'Pump Capacity': '0.5 HP',
    'Pipeline Size': '4 inch PVC',
    'Overflow Management': 'Automatic',
    'Maintenance Frequency': 'Quarterly'
  };

  const maintenanceSchedule = [
    { task: 'Clean gutters and downpipes', frequency: 'Monthly' },
    { task: 'Check first flush diverter', frequency: 'Monthly' },
    { task: 'Inspect tank and clean if needed', frequency: 'Quarterly' },
    { task: 'Replace filters', frequency: 'Every 6 months' },
    { task: 'System performance check', frequency: 'Annually' }
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
        📊 Detailed Results & Analysis
      </Typography>

      <Grid container spacing={3}>
        {/* Water Balance Analysis */}
        <Grid item xs={12} md={6}>
          <WaterBalanceChart 
            harvestableWater={results.harvestableWater}
            annualRainfall={results.annualRainfall}
            roofArea={user_data.roof_area}
          />
        </Grid>

        {/* System Efficiency */}
        <Grid item xs={12} md={6}>
          <EfficiencyGauge 
            runoffCoeff={results.runoffCoeff}
            collectionEff={results.collectionEff}
            storageEff={results.storageEff}
            overallEff={results.overallEfficiency}
          />
        </Grid>

        {/* Environmental Impact */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <span style={{ color: '#1976d2', fontSize: '24px', marginRight: '8px' }}>💧</span>
                <Typography variant="h6" color="primary">
                  Environmental Impact
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Groundwater Recharge
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {formatNumber(results.environmentalImpact.groundwaterRecharge)} L/year
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={70} 
                    sx={{ mt: 1, mb: 2 }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    CO₂ Reduction
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    {results.environmentalImpact.co2Reduction} kg/year
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Energy Savings
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    {results.environmentalImpact.energySavings} kWh/year
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body2" color="text.secondary">
                Your RWH system will contribute significantly to environmental conservation 
                by reducing dependency on groundwater extraction and municipal supply.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Technical Specifications */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <span style={{ color: '#9c27b0', fontSize: '24px', marginRight: '8px' }}>🔧</span>
                <Typography variant="h6" color="secondary">
                  Technical Specifications
                </Typography>
              </Box>

              <Grid container spacing={1}>
                {Object.entries(technicalSpecs).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <Grid item xs={7}>
                      <Typography variant="body2" color="text.secondary">
                        {key}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography variant="body2" fontWeight="medium">
                        {value}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Maintenance Schedule */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="warning.main">
                🔧 Maintenance Schedule
              </Typography>
              
              <Grid container spacing={2}>
                {maintenanceSchedule.map((item, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Box sx={{ 
                      p: 2, 
                      border: 1, 
                      borderColor: 'divider',
                      borderRadius: 1,
                      '&:hover': {
                        bgcolor: 'action.hover'
                      }
                    }}>
                      <Typography variant="body2" fontWeight="medium">
                        {item.task}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.frequency}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Regular maintenance ensures optimal performance and longevity of your RWH system.
                Annual professional inspection is recommended.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResultsTab;
