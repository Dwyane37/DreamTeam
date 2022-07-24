import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fields } from '../assets';
export default function FieldFilter(props) {
  const [filter, setFilter] = props.updateFilter;

  const handleUpdate = (e, value, reason) => {
    if (reason === 'clear') {
      setFilter((filter) => ({ ...filter, field: null }));
    } else {
      setFilter((filter) => ({ ...filter, field: value }));
    }
  };

  return (
    <>
      <p>Field of Study</p>
      <Autocomplete
        disablePortal
        id="field_filter"
        options={fields}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        getOptionLabel={(option) => option.label}
        sx={{ width: 300 }}
        value={filter.field}
        onChange={(e, value, reason) => {
          handleUpdate(e, value, reason);
        }}
        renderInput={(params) => <TextField {...params} label="Field" />}
      />
    </>
  );
}
