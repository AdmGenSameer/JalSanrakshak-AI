import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';

const AboutTab = () => {
  const benefits = [
    {
      icon: <span style={{ color: '#1976d2', fontSize: '24px' }}>💧</span>,
      title: 'Water Security',
      description: 'Reduce dependency on municipal supply and ensure water availability during droughts'
    },
    {
      icon: <span style={{ color: '#2e7d32', fontSize: '24px' }}>🌱</span>,
      title: 'Environmental Impact',
      description: 'Conserve groundwater, reduce stormwater runoff, and contribute to sustainability'
    },
    {
      icon: <span style={{ color: '#ed6c02', fontSize: '24px' }}>💰</span>,
      title: 'Cost Savings',
      description: 'Significant reduction in water bills with relatively quick payback period'
    },
    {
      icon: <span style={{ color: '#9c27b0', fontSize: '24px' }}>🛡️</span>,
      title: 'Future Resilience',
      description: 'Prepare for water scarcity and climate change impacts'
    }
  ];

  const dataSources = [
    'India Meteorological Department (IMD) for rainfall data',
    'Central Ground Water Board (CGWB) for groundwater information',
    'National Bureau of Soil Survey for soil characteristics',
    'Geological Survey of India for aquifer mapping',
    'Bureau of Indian Standards for water quality parameters'
  ];

  const faqs = [
    {
      question: 'How much water can I harvest?',
      answer: 'The amount depends on your roof area, local rainfall, and system efficiency. On average, you can harvest 80-90% of rainfall falling on your roof area.'
    },
    {
      question: 'What is the maintenance requirement?',
      answer: 'Basic maintenance includes monthly cleaning of gutters, quarterly tank inspection, and annual professional servicing. Well-maintained systems can last 15-20 years.'
    },
    {
      question: 'Is rainwater safe for drinking?',
      answer: 'With proper filtration and treatment, rainwater can be made potable. However, most systems are designed for non-potable uses like gardening, washing, and toilet flushing.'
    },
    {
      question: 'What permits are required?',
      answer: 'Requirements vary by location. Some areas mandate RWH for new constructions. Check with local authorities for specific regulations in your area.'
    },
    {
      question: 'How long does installation take?',
      answer: 'Installation typically takes 3-7 days depending on system complexity, site conditions, and weather. Underground systems may take longer.'
    }
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
        ℹ️ About Rainwater Harvesting
      </Typography>

      <Grid container spacing={3}>
        {/* Project Overview */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                🏠 JanSanrakshak AI - Rooftop Rainwater Harvesting Assessment
              </Typography>
              <Typography variant="body1" paragraph>
                This intelligent assessment tool helps property owners evaluate the feasibility 
                and benefits of implementing rooftop rainwater harvesting systems. Using advanced 
                calculations and local data, it provides personalized recommendations for optimal 
                water conservation solutions.
              </Typography>
              <Typography variant="body1">
                Our mission is to promote water security and environmental sustainability through 
                accessible, data-driven insights that empower individuals and communities to make 
                informed decisions about water management.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Key Benefits */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            🌟 Key Benefits of Rainwater Harvesting
          </Typography>
          <Grid container spacing={2}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card elevation={2} sx={{ height: '100%' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      {benefit.icon}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {benefit.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* How It Works */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🔧 How It Works
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Typography variant="body2" color="primary">1</Typography>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Data Collection"
                    secondary="Input your property details and location information"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Typography variant="body2" color="primary">2</Typography>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Analysis"
                    secondary="AI processes local climate, soil, and groundwater data"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Typography variant="body2" color="primary">3</Typography>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Calculations"
                    secondary="Estimates harvestable water and system requirements"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Typography variant="body2" color="primary">4</Typography>
                  </ListItemIcon>
                  <ListItemText 
                    primary="Recommendations"
                    secondary="Provides personalized system design and cost analysis"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Data Sources */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <span style={{ color: '#9c27b0', fontSize: '24px', marginRight: '8px' }}>ℹ️</span>
                <Typography variant="h6" color="secondary">
                  Data Sources
                </Typography>
              </Box>
              <List dense>
                {dataSources.map((source, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Typography variant="body2" color="secondary">•</Typography>
                    </ListItemIcon>
                    <ListItemText 
                      primary={source}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* FAQs */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            ❓ Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <Accordion key={index} elevation={2}>
              <AccordionSummary expandIcon={<span style={{ fontSize: '20px' }}>▼</span>}>
                <Typography variant="subtitle1">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>

        {/* Disclaimer */}
        <Grid item xs={12}>
          <Card elevation={2} sx={{ bgcolor: 'warning.light' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <span style={{ color: '#ed6c02', fontSize: '24px', marginRight: '8px' }}>⚠️</span>
                <Typography variant="h6" color="warning.dark">
                  Important Disclaimer
                </Typography>
              </Box>
              <Typography variant="body2" color="warning.dark">
                This tool provides estimates based on general assumptions and regional data. 
                Actual performance may vary due to local conditions, system design, and maintenance. 
                Consult with certified professionals for detailed engineering and implementation. 
                The developers are not liable for decisions made based on these estimates.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutTab;
