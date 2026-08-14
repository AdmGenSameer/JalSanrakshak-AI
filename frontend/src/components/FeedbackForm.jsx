import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Typography,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import apiService from '../services/apiService';

const validationSchema = Yup.object({
  rating: Yup.number().min(1, 'Please provide a rating').required('Rating is required'),
  comments: Yup.string().max(500, 'Comments cannot exceed 500 characters')
});

const FeedbackForm = () => {
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const formik = useFormik({
    initialValues: {
      rating: 0,
      comments: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await apiService.submitFeedback(values);
        setSnackbar({
          open: true,
          message: 'Thank you for your feedback!',
          severity: 'success'
        });
        resetForm();
        setOpen(false);
      } catch (error) {
        console.error('Feedback submission error:', error);
        setSnackbar({
          open: true,
          message: 'Failed to submit feedback. Please try again.',
          severity: 'error'
        });
      } finally {
        setSubmitting(false);
      }
    }
  });

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<span style={{ fontSize: '18px' }}>📝</span>}
        onClick={() => setOpen(true)}
        sx={{ mt: 2 }}
      >
        Share Feedback
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>
            Share Your Feedback
          </DialogTitle>
          
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              How would you rate this RWH assessment tool?
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Rating
                name="rating"
                value={formik.values.rating}
                onChange={(event, newValue) => {
                  formik.setFieldValue('rating', newValue);
                }}
                size="large"
              />
              {formik.touched.rating && formik.errors.rating && (
                <Typography variant="caption" color="error" display="block">
                  {formik.errors.rating}
                </Typography>
              )}
            </Box>

            <TextField
              fullWidth
              multiline
              rows={4}
              name="comments"
              label="Comments (optional)"
              value={formik.values.comments}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.comments && Boolean(formik.errors.comments)}
              helperText={formik.touched.comments && formik.errors.comments}
              placeholder="Share your thoughts on how we can improve..."
              variant="outlined"
            />
            
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Your feedback helps us improve the tool for everyone.
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FeedbackForm;
