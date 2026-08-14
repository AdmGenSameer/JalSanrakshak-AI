import React from 'react';
import Plot from 'react-plotly.js';
import { Paper, Typography, Box } from '@mui/material';
import { generateSampleRainfallData } from '../../utils/calculations';

const MonthlyRainfallChart = ({ data = null }) => {
  const rainfallData = data || generateSampleRainfallData();

  const plotData = [{
    x: rainfallData.map(d => d.month),
    y: rainfallData.map(d => d.rainfall),
    type: 'bar',
    marker: {
      color: rainfallData.map(d => d.rainfall),
      colorscale: 'Blues',
      colorbar: {
        title: 'Rainfall (mm)',
        titleside: 'right'
      }
    },
    text: rainfallData.map(d => `${d.rainfall}mm`),
    textposition: 'auto',
    hovertemplate: '<b>%{x}</b><br>Rainfall: %{y}mm<extra></extra>'
  }];

  const layout = {
    title: {
      text: 'Monthly Rainfall Distribution',
      font: { size: 16 }
    },
    xaxis: {
      title: 'Month',
      tickangle: -45
    },
    yaxis: {
      title: 'Rainfall (mm)'
    },
    margin: { t: 50, b: 80, l: 60, r: 40 },
    showlegend: false,
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
        Monthly Rainfall Pattern
      </Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <Plot
          data={plotData}
          layout={layout}
          config={config}
          style={{ width: '100%', height: '100%' }}
          useResizeHandler={true}
        />
      </Box>
    </Paper>
  );
};

export default MonthlyRainfallChart;
