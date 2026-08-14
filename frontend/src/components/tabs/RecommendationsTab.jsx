import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import { useAppContext } from '../../context/useAppContext';
import CostBenefitChart from '../charts/CostBenefitChart';
import { formatCurrency } from '../../utils/calculations';

const RecommendationsTab = () => {
  const { state } = useAppContext();
  const { user_data } = state;
  const results = user_data?.results;

  if (!results) {
    return null;
  }

  // Customize implementation steps based on soil type
  const soilSpecificStep = user_data?.soil_type === 'Sandy' ? 'Percolation pit excavation and lining' :
                          user_data?.soil_type === 'Clay' ? 'Surface tank platform and foundation work' :
                          user_data?.soil_type === 'Loamy' ? 'Recharge well drilling and casing installation' :
                          'Excavation and foundation work';

  const implementationSteps = [
    'Site survey and detailed soil testing',
    'Obtain necessary permits and clearances',
    soilSpecificStep,
    results.recommendedStructure === 'Underground Tank' ? 'Tank installation and waterproofing' : 
    (results.recommendedStructure === 'Percolation Pit' ? 'Filter media layering and inspection chamber construction' :
     results.recommendedStructure === 'Surface Storage Tank' ? 'Tank assembly and plumbing' : 'Well screen installation and gravel packing'),
    'First flush diverter and filtration system setup',
    'Connection to existing water supply',
    'System testing and commissioning'
  ];

  const benefits = [
    `Save ₹${Math.round(results.annualSavings)} annually on water bills`,
    `Harvest ${Math.round(results.harvestableWater/1000)} kiloliters of water per year`,
    `Reduce dependency on municipal water supply`,
    `Contribute to groundwater recharge`,
    `Environmentally sustainable water management`
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
        💡 System Recommendations
      </Typography>

      <Grid container spacing={3}>
        {/* Recommended Structure */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ height: 'fit-content' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <span style={{ color: '#1976d2', fontSize: '24px', marginRight: '8px' }}>🔧</span>
                <Typography variant="h6" color="primary">
                  Recommended RWH Structure
                </Typography>
              </Box>
              
              <Typography variant="h4" gutterBottom>
                {results.recommendedStructure}
              </Typography>
              
              <Typography variant="body1" paragraph color="text.secondary">
                Based on your roof area of {user_data.roof_area} sq m and available open space,
                an {results.recommendedStructure.toLowerCase()} is the most suitable option for your property.
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Chip 
                  label={`Capacity: ${Math.round(results.harvestableWater/1000)} KL`}
                  color="primary" 
                  sx={{ mr: 1, mb: 1 }}
                />
                <Chip 
                  label={`Efficiency: ${Math.round(results.overallEfficiency * 100)}%`}
                  color="secondary"
                  sx={{ mr: 1, mb: 1 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Cost and Benefits */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <span style={{ color: '#ed6c02', fontSize: '24px', marginRight: '8px' }}>💰</span>
                <Typography variant="h6" color="warning.main">
                  Investment & Returns
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Installation Cost
                  </Typography>
                  <Typography variant="h5" color="warning.main">
                    {formatCurrency(results.installationCost)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Annual Savings
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    {formatCurrency(results.annualSavings)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Payback Period
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {results.paybackPeriod} years
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    10-Year Savings
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    {formatCurrency(results.annualSavings * 10)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Implementation Steps */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Implementation Steps
              </Typography>
              <List dense>
                {implementationSteps.map((step, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Typography variant="body2" color="primary">
                        {index + 1}
                      </Typography>
                    </ListItemIcon>
                    <ListItemText 
                      primary={step}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Key Benefits */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                <span style={{ color: '#2e7d32', fontSize: '24px', marginRight: '8px' }}>📈</span>
                <Typography variant="h6" color="success.main">
                  Key Benefits
                </Typography>
              </Box>
              <List dense>
                {benefits.map((benefit, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <span style={{ color: 'green', fontSize: '16px' }}>✓</span>
                    </ListItemIcon>
                    <ListItemText 
                      primary={benefit}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Cost-Benefit Chart */}
        <Grid item xs={12}>
          <CostBenefitChart 
            installationCost={results.installationCost}
            annualSavings={results.annualSavings}
          />
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => window.open('tel:+91-9876543210')}
            >
              Get Expert Consultation
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => window.open('mailto:info@rwhsystem.com')}
            >
              Request Detailed Quote
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecommendationsTab;
