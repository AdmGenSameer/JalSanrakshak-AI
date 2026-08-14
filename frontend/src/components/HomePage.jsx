import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Stack 
} from '@mui/material';
// import rainStats from '../utils/demoData';

const HomePage = ({ onCalculateClick }) => {
  const handleCalculateClick = () => {
    if (onCalculateClick) {
      onCalculateClick();
    }
  };

  // Key stats about rainwater harvesting
  const stats = [
    {
      title: '70%',
      description: "of Earth's surface is water, yet only 2.5% is freshwater"
    },
    {
      title: '844 Million',
      description: 'people lack basic drinking water services worldwide'
    },
    {
      title: '55,000 Liters',
      description: 'of rainwater can be harvested annually from a 100 sq.m roof in average rainfall areas'
    },
    {
      title: '30-50%',
      description: 'reduction in water bills when implementing a proper rainwater harvesting system'
    }
  ];

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
        pt: 5
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h2" 
            component="h1" 
            fontWeight="bold" 
            color="primary" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textShadow: '0px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            JanSanrakshakAI
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            mb={4}
            sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' } }}
          >
            Intelligent Rooftop Rainwater Harvesting Assessment Tool
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '800px', mx: 'auto' }}>
            Conserve water, save money, and contribute to environmental sustainability with our AI-powered 
            rainwater harvesting assessment tool. Get personalized recommendations based on your 
            location, roof area, and local rainfall patterns.
          </Typography>
          
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleCalculateClick}
            sx={{ 
              py: 1.5, 
              px: 4, 
              fontSize: '1.1rem',
              mt: 2,
              borderRadius: '50px',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(25, 118, 210, 0.5)',
              }
            }}
          >
            Calculate Your Potential
          </Button>
        </Box>

        {/* Key Stats Section */}
        <Box mb={8}>
          <Typography 
            variant="h4" 
            textAlign="center" 
            mb={4}
            color="primary.dark"
          >
            Why Rainwater Harvesting Matters
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  elevation={3} 
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    transition: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Typography 
                      variant="h3" 
                      color="primary" 
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Benefits Section */}
        <Box mb={8}>
          <Typography 
            variant="h4" 
            textAlign="center" 
            mb={4}
            color="primary.dark"
          >
            Benefits of Rainwater Harvesting
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <BenefitItem title="Water Conservation" 
                  description="Reduce dependency on municipal water supply and preserve precious groundwater resources" 
                />
                <BenefitItem title="Cost Savings" 
                  description="Lower water bills and potential tax incentives for implementing sustainable water solutions" 
                />
                <BenefitItem title="Flood Control" 
                  description="Reduce stormwater runoff and decrease the risk of local flooding during heavy rainfall" 
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <BenefitItem title="Water Quality" 
                  description="Rainwater is naturally soft and free from chemicals, making it ideal for many household uses" 
                />
                <BenefitItem title="Energy Savings" 
                  description="Reduce the energy required to treat and pump municipal water to your home" 
                />
                <BenefitItem title="Environmental Impact" 
                  description="Contribute to groundwater recharge and reduce erosion and pollution in waterways" 
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
        
        {/* Call to Action */}
        <Box textAlign="center" py={5}>
          <Typography variant="h5" color="text.secondary" mb={3}>
            Ready to discover your rainwater harvesting potential?
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleCalculateClick}
            sx={{ 
              py: 1.5, 
              px: 4, 
              fontSize: '1.1rem',
              borderRadius: '50px',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(25, 118, 210, 0.5)',
              }
            }}
          >
            Get Started Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

const BenefitItem = ({ title, description }) => (
  <Card sx={{ borderRadius: 2 }}>
    <CardContent>
      <Typography variant="h6" gutterBottom color="primary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default HomePage;
