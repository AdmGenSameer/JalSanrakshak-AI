import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const SplashScreen = ({ message }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9999,
        color: 'white'
      }}
    >
      <Box
        sx={{
          backgroundColor: 'primary.main',
          padding: 4,
          borderRadius: 2,
          maxWidth: '80%',
          textAlign: 'center',
          boxShadow: 6
        }}
      >
        <Typography variant="h4" gutterBottom>
          🌧️ JanSanrakshak AI
        </Typography>
        <CircularProgress color="secondary" size={60} sx={{ my: 3 }} />
        <Typography variant="h5">
          {message || 'Calculating your rainwater harvesting potential...'}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, opacity: 0.8 }}>
          Analyzing data for optimal solutions...
        </Typography>
      </Box>
    </Box>
  );
};

export default SplashScreen;
