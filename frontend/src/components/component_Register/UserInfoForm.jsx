import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function ProfileInfo({ state, label }) {
  React.useEffect(() => {
    state[1]({ ...state[0], name: `${state[0].firstname} ${state[0].lastname}` });
  }, [state[0].firstname, state[0].lastname]);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Profile Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            value={state[0].name.split(' ')[0]}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => {
              state[1]({ ...state[0], firstname: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={state[0].name.split(' ')[1]}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e) => {
              state[1]({ ...state[0], lastname: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="organisation"
            name="organisation"
            label={label}
            value={state[0].organisation}
            fullWidth
            autoComplete="Organisation"
            variant="standard"
            onChange={(e) => {
              state[1]({ ...state[0], organisation: e.target.value });
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
