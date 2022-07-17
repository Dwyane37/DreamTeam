import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { citizenship } from '../assets';
import './Filter.css';
export default function CitizenshipFilter(props) {
  const [filter, setFilter] = props.updateFilter;

  const handleUpdate = (e, value, reason) => {
    if (reason === 'clear') {
      setFilter((filter) => ({ ...filter, citizenship: null }));
    } else {
      setFilter((filter) => ({ ...filter, citizenship: value }));
    }
  };
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
        className="citizenship_filter_box"
        multiple
        id="citizenship_filter"
        options={citizenship}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        getOptionLabel={(option) => option.label}
        onChange={(e, value, reason) => handleUpdate(e, value, reason)}
        value={filter.citizenship}
        renderInput={(params) => <TextField {...params} label="Citizenship" />}
      />
    </>
  );
}
