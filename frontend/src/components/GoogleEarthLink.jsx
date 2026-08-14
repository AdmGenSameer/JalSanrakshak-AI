import React from 'react';
import { Button, Box } from '@mui/material';
import { generateGoogleEarthLink } from '../utils/calculations';
import { useAppContext } from '../context/useAppContext';

const GoogleEarthLink = () => {
  const { state } = useAppContext();
  const { user_data } = state;

  // Only show if we have coordinates (in real app, these would come from geocoding)
  if (!user_data.latitude || !user_data.longitude) {
    return null;
  }

  const handleOpenGoogleEarth = () => {
    const link = generateGoogleEarthLink(user_data.latitude, user_data.longitude);
    window.open(link, '_blank');
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="outlined"
        startIcon={<span style={{ fontSize: '18px' }}>🌍</span>}
        onClick={handleOpenGoogleEarth}
        color="secondary"
      >
        Measure Area in Google Earth
      </Button>
    </Box>
  );
};

export default GoogleEarthLink;
