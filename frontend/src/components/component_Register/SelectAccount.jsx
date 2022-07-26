import React from 'react';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
import { TextField, Button, Grid } from '@mui/material';

export default function SelectAccount({ state }) {
  const update = (e) => {
    state[1](e.target.id);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Button
          id="student"
          name="student"
          style={{ padding: '2rem 5rem' }}
          variant={state[0] === 'student' ? 'contained' : 'outlined'}
          onClick={update}
        >
          student
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          id="company"
          name="company"
          style={{ padding: '2rem 5rem' }}
          variant={state[0] === 'company' ? 'contained' : 'outlined'}
          onClick={update}
        >
          company
        </Button>
      </Grid>
    </Grid>
  );
}
