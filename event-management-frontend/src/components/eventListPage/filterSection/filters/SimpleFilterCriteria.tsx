import React from 'react';
import { TextField } from '@material-ui/core';

interface SimpleFilterCriteriaProps {
  label: string;
  value: string;
  handleChange: (value: string) => void;
}

function SimpleFilterCriteria({ label, value, handleChange }: SimpleFilterCriteriaProps) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      fullWidth
      variant="outlined"
    />
  );
}

export default SimpleFilterCriteria;
