import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { validateAge, validateEmail, validatePhone } from './utils';

// ----------------------------------------------------------------------

export default function SheetsForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    age: initialData?.age || '',
    address: initialData?.address || '',
    phone: initialData?.phone || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    const {value} = event.target;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Age validation
    if (formData.age && !validateAge(formData.age)) {
      newErrors.age = 'Age must be a number between 0 and 150';
    }

    // Address validation
    if (formData.address && formData.address.length > 500) {
      newErrors.address = 'Address must be less than 500 characters';
    }

    // Phone validation
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Clean up data
    const cleanData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      age: formData.age ? parseInt(formData.age, 10) : '',
      address: formData.address.trim(),
      phone: formData.phone.trim(),
    };

    await onSubmit(cleanData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <TextField
          label="Name"
          value={formData.name}
          onChange={handleChange('name')}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          required
          autoFocus
          inputProps={{ maxLength: 100 }}
        />

        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          required
        />

        <TextField
          label="Age"
          type="number"
          value={formData.age}
          onChange={handleChange('age')}
          error={!!errors.age}
          helperText={errors.age}
          fullWidth
          inputProps={{ min: 0, max: 150 }}
        />

        <TextField
          label="Address"
          value={formData.address}
          onChange={handleChange('address')}
          error={!!errors.address}
          helperText={errors.address}
          fullWidth
          multiline
          rows={3}
          inputProps={{ maxLength: 500 }}
        />

        <TextField
          label="Phone"
          value={formData.phone}
          onChange={handleChange('phone')}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
          placeholder="e.g., +1234567890"
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
          <Button
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            loadingPosition="start"
          >
            {initialData ? 'Update' : 'Create'}
          </LoadingButton>
        </Stack>
      </Stack>
    </Box>
  );
}

SheetsForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};