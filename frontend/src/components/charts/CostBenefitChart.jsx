import React from 'react';
import Plot from 'react-plotly.js';
import { Paper, Typography, Box } from '@mui/material';
import { calculateFinancialProjection } from '../../utils/calculations';

const CostBenefitChart = ({ installationCost, annualSavings }) => {
  const projectionData = calculateFinancialProjection(installationCost, annualSavings, 10);

  const plotData = [{
    x: projectionData.map(d => d.year),
    y: projectionData.map(d => d.cumulativeSavings),
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Cumulative Savings',
    line: {
      color: '#1976d2',
      width: 3
    },
    marker: {
      size: 8,
      color: projectionData.map(d => d.cumulativeSavings >= 0 ? '#4caf50' : '#f44336')
    },
    hovertemplate: '<b>Year %{x}</b><br>Cumulative Savings: ₹%{y:,.0f}<extra></extra>'
  }];

  const layout = {
    title: {
      text: '10-Year Financial Projection',
      font: { size: 16 }
    },
    xaxis: {
      title: 'Years',
      tickmode: 'linear',
      tick0: 0,
      dtick: 1
    },
    yaxis: {
      title: 'Cumulative Savings (₹)',
      tickformat: ',.0f'
    },
    shapes: [{
      type: 'line',
      x0: 0,
      y0: 0,
      x1: 10,
      y1: 0,
      line: {
        color: 'rgba(0,0,0,0.3)',
        width: 1,
        dash: 'dash'
      }
    }],
    annotations: [{
      x: 3,
      y: installationCost * 0.5,
      text: 'Break-even Point',
      showarrow: true,
      arrowhead: 2,
      arrowsize: 1,
      arrowwidth: 2,
      arrowcolor: '#666'
    }],
    margin: { t: 50, b: 60, l: 80, r: 40 },
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
        Cost-Benefit Analysis
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
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        This chart shows the cumulative financial impact over 10 years, including initial investment and ongoing savings.
      </Typography>
    </Paper>
  );
};

export default CostBenefitChart;
