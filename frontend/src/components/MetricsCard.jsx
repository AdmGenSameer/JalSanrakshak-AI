import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { formatNumber, formatCurrency } from '../utils/calculations';

const MetricsCard = ({ 
  title, 
  value, 
  unit, 
  color = 'primary', 
  icon,
  subtitle,
  description
}) => {
  const formatValue = () => {
    if (unit === '₹' || unit === 'INR') {
      return formatCurrency(value);
    } else if (typeof value === 'number') {
      return formatNumber(value, unit === '%' ? 1 : 0);
    }
    return value;
  };

  return (
    <Card 
      elevation={3} 
      className="metric-card group"
      sx={{ 
        height: '100%',
        transition: 'all 0.3s ease',
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 8
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          backgroundColor: `${color}.main`,
          opacity: 0.9
        }
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box display="flex" alignItems="center" mb={2}>
          {icon && (
            <Box 
              sx={{ mr: 2, color: `${color}.main` }}
              className="transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse"
            >
              <span className="text-2xl">{icon}</span>
            </Box>
          )}
          
          <Box>
            <Typography 
              variant="h6" 
              color={`${color}.main`} 
              gutterBottom
              className="font-semibold"
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                gutterBottom
                className="text-sm"
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
        
        <Box 
          className="transition-all duration-300 py-2"
          sx={{
            borderRadius: 2,
            px: 1,
            bgcolor: `${color}.light`,
            opacity: 0.1,
            mx: -1,
            mb: 2
          }}
        />
        
        <Typography 
          variant="h4" 
          component="div" 
          gutterBottom
          className="group-hover:animate-pulse"
          sx={{ 
            fontWeight: 700,
            fontSize: { xs: '1.7rem', sm: '2rem' }
          }}
        >
          {formatValue()}
          {unit && unit !== '₹' && unit !== 'INR' && (
            <Typography 
              component="span" 
              variant="body1" 
              color="text.secondary" 
              sx={{ ml: 0.5, opacity: 0.8 }}
            >
              {unit}
            </Typography>
          )}
        </Typography>

        {description && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            className="text-sm"
            sx={{ opacity: 0.85 }}
          >
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
