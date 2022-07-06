import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function FieldFilter() {
  const fields = [
    { label: 'Information Technology' },
    { label: 'Law' },
    { label: 'Science' },
    { label: ' Statistics' },
    { label: ' Medicine' },
    { label: ' Engineering' },
  ];
  return (
    <>
      <h3>Field of Study</h3>
      <Autocomplete
        disablePortal
        id="field_filter"
        options={fields}
        getOptionLabel={(option) => option.label}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Field" />}
      />
    </>
  );
}
