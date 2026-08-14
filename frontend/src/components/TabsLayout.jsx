import React, { useState } from 'react';
import { Tabs, Tab, Box, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';

import AssessmentTab from './tabs/AssessmentTab';
import RecommendationsTab from './tabs/RecommendationsTab';
import ResultsTab from './tabs/ResultsTab';
import GroundwaterTab from './tabs/GroundwaterTab';
import AboutTab from './tabs/AboutTab';
import { useAppContext } from '../context/useAppContext';

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const TabsLayout = () => {
  const [value, setValue] = useState(0);
  const { state } = useAppContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: 'Assessment',
      icon: '🏠',
      component: <AssessmentTab />,
      disabled: false
    },
    {
      label: 'Recommendations',
      icon: '💡',
      component: <RecommendationsTab />,
      disabled: !state.calculation_done
    },
    {
      label: 'Results',
      icon: '📊',
      component: <ResultsTab />,
      disabled: !state.calculation_done
    },
    {
      label: 'Groundwater',
      icon: '💧',
      component: <GroundwaterTab />,
      disabled: !state.calculation_done
    },
    {
      label: 'About',
      icon: 'ℹ️',
      component: <AboutTab />,
      disabled: false
    }
  ];  return (
    <Paper elevation={2} className="rounded-lg overflow-hidden shadow-md">
      <Box 
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          bgcolor: theme.palette.grey[50],
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTab-root': {
              minWidth: isMobile ? 100 : 120,
              fontSize: isMobile ? '0.85rem' : '0.95rem',
              fontWeight: 500,
              py: isMobile ? 1 : 1.5,
              transition: 'all 0.2s ease-in-out',
            },
            '& .MuiTab-root.Mui-selected': {
              fontWeight: 700,
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
            }
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              icon={
                <span className={`text-xl ${!tab.disabled ? 'animate-pulse-slow' : ''}`}>
                  {tab.icon}
                </span>
              }
              iconPosition="start"
              disabled={tab.disabled}
              {...a11yProps(index)}
              sx={{
                '&.Mui-disabled': {
                  opacity: 0.4
                }
              }}
            />
          ))}
        </Tabs>
      </Box>

      <div className="transition-all duration-300">
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            {tab.disabled && state.calculation_done === false ? (
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  py: { xs: 5, md: 8 },
                  color: 'text.secondary',
                  px: 2
                }}
                className="bg-gradient-to-b from-gray-50 to-white"
              >
                <div className="mb-4 flex justify-center">
                  <span className="text-4xl opacity-70">📝</span>
                </div>
                <Typography variant="h6" gutterBottom>
                  Complete Assessment First
                </Typography>
                <Typography variant="body2" className="max-w-md mx-auto">
                  Please complete the assessment form to unlock this section and view personalized analysis.
                </Typography>
              </Box>
            ) : (
              <div className="animate-fadeIn">
                {tab.component}
              </div>
            )}
          </TabPanel>
        ))}
      </div>
    </Paper>
  );
};

export default TabsLayout;
