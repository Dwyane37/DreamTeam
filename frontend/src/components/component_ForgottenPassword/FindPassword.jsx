import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { apiCall } from '../API';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { ValidatePassword } from '../assets';

import './ForgottenPassword.css';

export default function FindPassword() {
  const [passwords, setPasswords] = React.useState({ new_password: '', new_password_confirm: '' });
  const [matching, setMatching] = React.useState(null);
  const [resetSuccess, setResetSuccess] = React.useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setPasswords({ ...passwords, [e.target.id]: e.target.value });
  };

  React.useEffect(() => {
    if (passwords.new_password !== '' && passwords.new_password_confirm !== '') {
      if (passwords.new_password !== passwords.new_password_confirm) {
        setMatching(false);
      } else {
        setMatching(true);
      }
    } else {
      setMatching(null);
    }
  }, [passwords]);

  const getHelperText = (password) => {
    if (!ValidatePassword(password)) {
      return 'Please enter a valid password';
    } else if (matching === false) {
      return 'Passwords do not match';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall('user/resetpassword', { email: sessionStorage.getItem('email'), password: passwords['new_password'] })
      .then((body) => {
        setResetSuccess(true);
      })
      .catch((e) => alert(e));
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      {resetSuccess && (
        <Alert severity="success">
          Your password has been reset, click <u onClick={navigateToLogin}>here</u> to login
        </Alert>
      )}
      {!resetSuccess && (
        <Box component="form" className="find_password_form" onSubmit={(e) => handleSubmit(e)}>
          <h3>Set your new password</h3>
          <Grid item xs={12}>
            <Typography variant="h8">Your password should:</Typography>
            <ul>
              <li> contain 6 to 20 characters</li>
              <li> and contain at least one numeric digit</li>
              <li> and contain at least one uppercase</li>
              <li>and contain at least one lowercase letter</li>
            </ul>
          </Grid>
          <div className="input-box">
            <label id="new_password_label" htmlFor="new_password">
              New Password
            </label>
            <TextField
              error={matching === false || !ValidatePassword(passwords.new_password) ? true : false}
              aria-label="New Password"
              id="new_password"
              type="password"
              helperText={getHelperText(passwords.new_password)}
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className="input-box">
            <label id="new_password_confirm_label" htmlFor="new_password_confirm">
              Confirm Password
            </label>
            <TextField
              error={matching === false || !ValidatePassword(passwords.new_password_confirm) ? true : false}
              aria-label="Confirme Password"
              id="new_password_confirm"
              type="password"
              onChange={(e) => changeHandler(e)}
              helperText={matching === false ? 'Passwords do not match' : null}
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            {/* {matching === false ? <p>Passwords do not match.</p> : null} */}
            <Button disabled={matching && ValidatePassword(passwords.new_password) ? false : true} type="submit">
              Submit
            </Button>
          </div>
        </Box>
      )}
    </>
  );
}
