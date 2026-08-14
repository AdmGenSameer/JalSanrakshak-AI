import React from 'react';
import Plot from 'react-plotly.js';
import { Paper, Typography, Box } from '@mui/material';

const WaterBalanceChart = ({ harvestableWater, annualRainfall, roofArea }) => {
  const totalRainfall = annualRainfall * roofArea; // mm * sq m = liters
  const runoff = totalRainfall * 0.2; // 20% runoff loss
  const remaining = totalRainfall - harvestableWater - runoff;

  const data = [{
    values: [harvestableWater, runoff, remaining],
    labels: ['Harvestable Water', 'Surface Runoff', 'Evaporation & Loss'],
    type: 'pie',
    textinfo: 'label+percent',
    textposition: 'auto',
    marker: {
      colors: ['#2196f3', '#ff9800', '#9e9e9e'],
      line: {
        color: '#ffffff',
        width: 2
      }
    },
    hovertemplate: '<b>%{label}</b><br>Amount: %{value:,.0f} L<br>Percentage: %{percent}<extra></extra>'
  }];

  const layout = {
    title: {
      text: 'Annual Water Balance Distribution',
      font: { size: 16 }
    },
    margin: { t: 50, b: 50, l: 50, r: 50 },
    showlegend: true,
    legend: {
      orientation: 'h',
      yanchor: 'bottom',
      y: -0.2,
      xanchor: 'center',
      x: 0.5
    },
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
        Water Balance Analysis
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
        Distribution of total rainfall on your roof area showing harvestable potential.
      </Typography>
    </Paper>
  );
};

export default WaterBalanceChart;
