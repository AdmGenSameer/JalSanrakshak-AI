import React from 'react';
import Plot from 'react-plotly.js';
import { Paper, Typography, Box, Grid } from '@mui/material';

const EfficiencyGauge = ({ runoffCoeff, collectionEff, storageEff, overallEff }) => {
  const createGauge = (value, title, color) => {
    return {
      type: 'indicator',
      mode: 'gauge+number',
      value: value * 100,
      title: { text: title, font: { size: 14 } },
      gauge: {
        axis: { range: [0, 100] },
        bar: { color: color },
        steps: [
          { range: [0, 50], color: 'rgba(255, 0, 0, 0.1)' },
          { range: [50, 80], color: 'rgba(255, 255, 0, 0.1)' },
          { range: [80, 100], color: 'rgba(0, 255, 0, 0.1)' }
        ],
        threshold: {
          line: { color: 'red', width: 4 },
          thickness: 0.75,
          value: 90
        }
      }
    };
  };

  // Overall efficiency gauge
  const overallData = [createGauge(overallEff, 'Overall Efficiency', '#1976d2')];
  
  // Individual efficiency gauges
  const runoffData = [createGauge(runoffCoeff, 'Runoff Coefficient', '#ff9800')];
  const collectionData = [createGauge(collectionEff, 'Collection Efficiency', '#4caf50')];
  const storageData = [createGauge(storageEff, 'Storage Efficiency', '#9c27b0')];

  const gaugeLayout = {
    width: 200,
    height: 180,
    margin: { t: 25, b: 25, l: 25, r: 25 },
    font: { size: 12 },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)'
  };

  const overallLayout = {
    width: 300,
    height: 250,
    margin: { t: 25, b: 25, l: 25, r: 25 },
    font: { size: 14 },
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
        System Efficiency Analysis
      </Typography>
      
      {/* Overall Efficiency */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Plot
          data={overallData}
          layout={overallLayout}
          config={config}
        />
      </Box>

      {/* Individual Efficiency Components */}
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Plot
              data={runoffData}
              layout={gaugeLayout}
              config={config}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Plot
              data={collectionData}
              layout={gaugeLayout}
              config={config}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Plot
              data={storageData}
              layout={gaugeLayout}
              config={config}
            />
          </Box>
        </Grid>
      </Grid>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        System efficiency depends on roof material, age, and storage design. 
        Overall efficiency is the product of all components.
      </Typography>
    </Paper>
  );
};

export default EfficiencyGauge;
