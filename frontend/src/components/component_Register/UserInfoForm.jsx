import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function ProfileInfo({ state, label }) {
  const [name, setName] = React.useState({ firstname: '', lastname: '' });
  React.useEffect(() => {
    state[1]({ ...state[0], name: `${name.firstname} ${name.lastname}` });
  }, [name]);
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
            value={name.firstname}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => {
              setName({ ...name, firstname: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={name.lastname}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e) => {
              setName({ ...name, lastname: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="organisation"
            name="organisation"
            label={label}
            value={name.organisation}
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
