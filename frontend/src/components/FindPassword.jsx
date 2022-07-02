import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { apiCall } from './API';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall('user/resetpassword', { email: localStorage.getItem('email'), password: passwords['new_password'] })
      .then((body) => {
        console.log(body);
        setResetSuccess(true);
      })
      .catch((e) => alert(e));

    // TODO submit new password
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      {resetSuccess && (
        <Alert severity="success">
          Your password has been reset, click <u>here</u> to login
        </Alert>
      )}
      {!resetSuccess && (
        <Box component="form" className="find_password_form" onSubmit={(e) => handleSubmit(e)}>
          <h3>Set your new password</h3>
          <label id="new_password_label" htmlFor="new_password">
            New Password
          </label>
          <TextField
            error={matching === false ? true : false}
            aria-label="New Password"
            id="new_password"
            type="password"
            onChange={(e) => changeHandler(e)}
          />
          <label id="new_password_confirm_label" htmlFor="new_password_confirm">
            Confirm Password
          </label>
          <TextField
            error={matching === false ? true : false}
            aria-label="Confirme Password"
            id="new_password_confirm"
            type="password"
            onChange={(e) => changeHandler(e)}
            helperText={matching === false ? 'Passwords do not match.' : null}
          />

          <div style={{ textAlign: 'right' }}>
            {/* {matching === false ? <p>Passwords do not match.</p> : null} */}
            <Button disabled={matching ? false : true} type="submit">
              Submit
            </Button>
          </div>
        </Box>
      )}
    </>
  );
}
