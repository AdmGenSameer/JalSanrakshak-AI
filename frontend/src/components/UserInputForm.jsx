import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Paper,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Box,
  CircularProgress
} from '@mui/material';
import { useAppContext } from '../context/useAppContext';
import { generateSampleResults } from '../utils/calculations';

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  location: Yup.string().min(3, 'Location must be at least 3 characters').required('Location is required'),
  dwellers: Yup.number().min(1, 'Must be at least 1').max(20, 'Cannot exceed 20').required('Required'),
  roof_area: Yup.number().min(10, 'Must be at least 10 sq m').max(1000, 'Cannot exceed 1000 sq m').required('Required'),
  open_space: Yup.number().min(0, 'Cannot be negative').max(500, 'Cannot exceed 500 sq m').required('Required'),
  roof_type: Yup.string().required('Roof type is required'),
  soil_type: Yup.string().required('Soil type is required'),
  roof_age: Yup.number().min(0, 'Cannot be negative').max(50, 'Cannot exceed 50 years').required('Required')
});

const roofTypes = [
  { value: 'Concrete', label: 'Concrete' },
  { value: 'Metal', label: 'Metal/Tin' },
  { value: 'Tile', label: 'Clay Tile' },
  { value: 'Asphalt', label: 'Asphalt Shingle' }
];

const soilTypes = [
  { value: 'Sandy', label: 'Sandy (High permeability)' },
  { value: 'Loamy', label: 'Loamy (Medium permeability)' },
  { value: 'Clay', label: 'Clay (Low permeability)' },
  { value: 'Silt', label: 'Silty (Medium-Low permeability)' },
  { value: 'Rocky', label: 'Rocky (Variable permeability)' }
];

const UserInputForm = ({ onCalculationStart }) => {
  const { state, actions } = useAppContext();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      actions.setLoading(true);
      actions.setError(null);
      
      // Update user data
      actions.setUserData(values);

      // Trigger calculation start event for splash screen
      if (onCalculationStart && typeof onCalculationStart === 'function') {
        onCalculationStart();
      }
      
      // Mock API call - replace with actual API calls
      const results = generateSampleResults(values);
      
      // In real implementation, you would:
      // 1. Geocode the location
      // const geoData = await apiService.geocode(values.location);
      // 2. Get rainfall data
      // const rainfallData = await apiService.getRainfallData(geoData.lat, geoData.lng);
      // 3. Calculate RWH metrics
      // const calculationData = await apiService.calculateRWH(values);
      
      actions.setUserData({
        ...values,
        results,
        assessment_id: `RWH_${Date.now()}`
      });
      
      actions.setCalculationDone(true);
    } catch (error) {
      actions.setError(error.message || 'Calculation failed. Please try again.');
      console.error('Assessment error:', error);
    } finally {
      actions.setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 3 }}>
        🏠 Rooftop Rainwater Harvesting Assessment
      </Typography>
      
      <Formik
        initialValues={state.user_data}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="name"
                  label="Full Name"
                  error={touched.name && errors.name}
                  helperText={touched.name && errors.name}
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Field
                  as={TextField}
                  fullWidth
                  name="location"
                  label="Location (City, State)"
                  error={touched.location && errors.location}
                  helperText={touched.location && errors.location}
                  variant="outlined"
                  placeholder="e.g., Mumbai, Maharashtra"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Field
                  as={TextField}
                  fullWidth
                  name="dwellers"
                  label="Number of Dwellers"
                  type="number"
                  error={touched.dwellers && errors.dwellers}
                  helperText={touched.dwellers && errors.dwellers}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Field
                  as={TextField}
                  fullWidth
                  name="roof_area"
                  label="Roof Area (sq m)"
                  type="number"
                  error={touched.roof_area && errors.roof_area}
                  helperText={touched.roof_area && errors.roof_area}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Field
                  as={TextField}
                  fullWidth
                  name="open_space"
                  label="Open Space (sq m)"
                  type="number"
                  error={touched.open_space && errors.open_space}
                  helperText={touched.open_space && errors.open_space}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Field
                  as={TextField}
                  select
                  fullWidth
                  name="roof_type"
                  label="Roof Type"
                  error={touched.roof_type && errors.roof_type}
                  helperText={touched.roof_type && errors.roof_type}
                  variant="outlined"
                >
                  {roofTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={12} md={4}>
                <Field
                  as={TextField}
                  select
                  fullWidth
                  name="soil_type"
                  label="Soil Type"
                  error={touched.soil_type && errors.soil_type}
                  helperText={touched.soil_type && errors.soil_type}
                  variant="outlined"
                >
                  {soilTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={12} md={4}>
                <Field
                  as={TextField}
                  fullWidth
                  name="roof_age"
                  label="Roof Age (years)"
                  type="number"
                  error={touched.roof_age && errors.roof_age}
                  helperText={touched.roof_age && errors.roof_age}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting || state.loading}
                    sx={{ 
                      minWidth: 200,
                      height: 48,
                      fontSize: '1.1rem'
                    }}
                  >
                    {isSubmitting || state.loading ? (
                      <>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        Calculating...
                      </>
                    ) : (
                      'Calculate RWH Potential'
                    )}
                  </Button>
                </Box>
              </Grid>

              {state.error && (
                <Grid item xs={12}>
                  <Typography color="error" variant="body2">
                    {state.error}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default UserInputForm;
