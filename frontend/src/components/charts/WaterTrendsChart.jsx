import React from 'react';
import Plot from 'react-plotly.js';
import { Paper, Typography, Box } from '@mui/material';

const WaterTrendsChart = () => {
  // Generate sample historical water level data
  const years = Array.from({ length: 10 }, (_, i) => 2015 + i);
  const waterLevels = [25, 24.5, 23.8, 23.2, 22.5, 21.9, 21.3, 20.7, 20.2, 19.8];
  const rainfallData = [850, 920, 780, 1100, 650, 890, 720, 960, 680, 810];

  const data = [
    {
      x: years,
      y: waterLevels,
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Water Level (m below surface)',
      yaxis: 'y',
      line: { color: '#1976d2', width: 3 },
      marker: { size: 8 }
    },
    {
      x: years,
      y: rainfallData,
      type: 'bar',
      name: 'Annual Rainfall (mm)',
      yaxis: 'y2',
      opacity: 0.6,
      marker: { color: '#4caf50' }
    }
  ];

  const layout = {
    title: {
      text: 'Historical Water Level & Rainfall Trends',
      font: { size: 16 }
    },
    xaxis: {
      title: 'Year'
    },
    yaxis: {
      title: 'Water Level (m below surface)',
      side: 'left',
      color: '#1976d2'
    },
    yaxis2: {
      title: 'Annual Rainfall (mm)',
      side: 'right',
      overlaying: 'y',
      color: '#4caf50'
    },
    legend: {
      x: 0.7,
      y: 1
    },
    margin: { t: 50, b: 60, l: 60, r: 60 },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)'
  };

  const config = {
    displayModeBar: false,
    responsive: true
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Historical Water Level & Rainfall Correlation
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <Plot
          data={data}
          layout={layout}
          config={config}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler={true}
        />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Historical data shows declining groundwater levels despite varying rainfall, 
        indicating the need for conservation measures like rainwater harvesting.
      </Typography>
    </Paper>
  );
};

export default WaterTrendsChart;
