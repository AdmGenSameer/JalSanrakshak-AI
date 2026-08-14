import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  LinearProgress
} from '@mui/material';

import { useAppContext } from '../../context/useAppContext';
import WaterTrendsChart from '../charts/WaterTrendsChart';

const GroundwaterTab = () => {
  const { state } = useAppContext();
  const { user_data } = state;
  const results = user_data?.results;

  if (!results) {
    return null;
  }

  const aquiferInfo = {
    type: results.aquiferType,
    soilType: results.soilType || 'Loamy',
    depth: results.waterLevel,
    rechargeRate: results.infiltrationRate > 15 ? 'High' : (results.infiltrationRate > 8 ? 'Moderate' : 'Low'),
    permeability: results.soilType === 'Sandy' ? 'High' : 
                 (results.soilType === 'Clay' ? 'Low' : 
                 (results.soilType === 'Silt' ? 'Medium-Low' : 'Medium')),
    yieldCapacity: results.soilType === 'Sandy' ? '400-600 L/min' : 
                  (results.soilType === 'Clay' ? '50-150 L/min' : 
                  (results.soilType === 'Silt' ? '100-300 L/min' : '200-500 L/min'))
  };

  const waterQualityParameters = [
    { parameter: 'pH', value: '7.2', status: 'Good', range: '6.5-8.5' },
    { parameter: 'TDS', value: '420 ppm', status: 'Good', range: '<500 ppm' },
    { parameter: 'Hardness', value: '180 ppm', status: 'Moderate', range: '<300 ppm' },
    { parameter: 'Chloride', value: '45 ppm', status: 'Good', range: '<250 ppm' },
    { parameter: 'Fluoride', value: '0.8 ppm', status: 'Good', range: '<1.5 ppm' },
    { parameter: 'Nitrate', value: '12 ppm', status: 'Good', range: '<45 ppm' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Good': return 'success';
      case 'Moderate': return 'warning';
      case 'Poor': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
        🌊 Groundwater Information & Analysis
      </Typography>

      <Grid container spacing={3}>
        {/* Aquifer Information */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <span style={{ color: '#1976d2', fontSize: '24px', marginRight: '8px' }}>💧</span>
                <Typography variant="h6" color="primary">
                  Aquifer Characteristics
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Aquifer Type
                  </Typography>
                  <Typography variant="h6">
                    {aquiferInfo.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {aquiferInfo.type === 'Alluvial' 
                      ? 'Formed by river deposits, generally high yielding and suitable for recharge'
                      : 'Hard rock aquifer with moderate to low yield potential'
                    }
                  </Typography>
                </Grid>

                                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Aquifer Type
                  </Typography>
                  <Typography variant="h6">
                    {aquiferInfo.type}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Soil Type
                  </Typography>
                  <Typography variant="h6">
                    {aquiferInfo.soilType}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Water Depth
                  </Typography>
                  <Typography variant="h6">
                    {aquiferInfo.depth} feet
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Recharge Rate
                  </Typography>
                  <Chip 
                    label={aquiferInfo.rechargeRate}
                    color="primary"
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Permeability
                  </Typography>
                  <Chip 
                    label={aquiferInfo.permeability}
                    color="success"
                    size="small"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Yield Capacity
                  </Typography>
                  <Typography variant="body2">
                    {aquiferInfo.yieldCapacity}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recharge Potential */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <EcoIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6" color="success.main">
                  Recharge Impact
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" mb={1}>
                Annual Groundwater Recharge
              </Typography>
              <Typography variant="h4" color="success.main" mb={2}>
                {Math.round(results.environmentalImpact.groundwaterRecharge / 1000)} KL
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={75} 
                color="success"
                sx={{ height: 8, borderRadius: 4, mb: 2 }}
              />

              <Typography variant="body2" color="text.secondary" paragraph>
                Your RWH system will contribute significantly to groundwater recharge,
                helping to restore the local water table and improve water security in your area.
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" fontWeight="medium">
                  Recharge Benefits:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Increased water table level<br/>
                  • Reduced land subsidence<br/>
                  • Improved water quality<br/>
                  • Enhanced water security
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Water Quality Analysis */}
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <QualityIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="secondary">
                  Groundwater Quality Parameters
                </Typography>
              </Box>

              <Grid container spacing={2}>
                {waterQualityParameters.map((param, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Box sx={{ 
                      p: 2, 
                      border: 1, 
                      borderColor: 'divider',
                      borderRadius: 1
                    }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="body2" fontWeight="medium">
                          {param.parameter}
                        </Typography>
                        <Chip 
                          label={param.status}
                          color={getStatusColor(param.status)}
                          size="small"
                        />
                      </Box>
                      <Typography variant="h6" color="primary">
                        {param.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Acceptable range: {param.range}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Water quality data is based on regional groundwater assessment. 
                Actual values may vary and should be tested before consumption.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Water Level Trends */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6" color="warning.main">
                  Historical Trends
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" mb={2}>
                Water Level Change (Last 10 Years)
              </Typography>
              
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h3" color="warning.main">
                  -2.3m
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Declining trend
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" paragraph>
                The groundwater level has been declining due to increased extraction
                and reduced natural recharge. RWH systems can help reverse this trend.
              </Typography>

              <Box sx={{ bgcolor: 'warning.light', p: 1, borderRadius: 1 }}>
                <Typography variant="body2" sx={{ color: 'warning.dark' }}>
                  ⚠️ Critical need for groundwater conservation measures
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Water Trends Chart */}
        <Grid item xs={12}>
          <WaterTrendsChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GroundwaterTab;
