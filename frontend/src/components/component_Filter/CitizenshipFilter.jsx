import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CitizenshipFilter() {
  const citizenship = [
    { label: 'Australian Citizen' },
    { label: 'Australian PR' },
    { label: 'New Zealand Citizen' },
    { label: ' New Zealand PR' },
    { label: ' Working Visa Holder' },
    { label: ' International Students' },
  ];
  return (
    <>
      <h3>Citizenship</h3>
      {/* <Autocomplete
        disablePortal
        id="citizenship_filter"
        options={citizenship}
        getOptionLabel={(option) => option.label}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Citizenship" />}
      /> */}
      <Autocomplete
        multiple
        id="citizenship_filter"
        options={citizenship}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} label="Citizenship" />}
      />
    </>
  );
}
