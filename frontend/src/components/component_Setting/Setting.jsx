import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { Typography, Divider } from '@mui/material';
import { apiGet, apiCall } from '../API';
import { ValidatePassword } from '../assets';

import './Setting.css';
export default function Settings() {
  const init_psw = {
    old_password: '',
    new_password: '',
    new_password_confirm: '',
  };
  const [success, setSuccess] = React.useState(false);
  const [passwords, setPasswords] = React.useState(init_psw);
  const [matching, setMatching] = React.useState(null);
  const [empty, setEmpty] = React.useState(null);
  const [accountInfo, setAccountInfo] = React.useState({ username: '', emai: '', mobile: '', type: '' });

  const clear = () => {
    setPasswords(init_psw);
  };
  const changeHandler = (e) => {
    setPasswords({ ...passwords, [e.target.id]: e.target.value });
  };
  const getHelperText = (password) => {
    if (!ValidatePassword(password)) {
      return 'Please enter a valid password';
    } else if (matching === false) {
      return 'Passwords do not match';
    }
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

  React.useEffect(() => {
    apiCall('user/getinfo', { token: sessionStorage.getItem('token') })
      .then((info) => {
        setAccountInfo({ ...info.data });
      })
      .catch((e) => alert(e));
  }, []);

  const resetPassword = () => {
    if (matching && passwords.old_password !== '') {
      apiGet('user/changepassword', {
        token: sessionStorage.getItem('token'),
        old_password: passwords.old_password,
        new_password: passwords.new_password,
      })
        .then((body) => {
          console.log(body);
          clear();
          setSuccess(true);
        })
        .catch((e) => alert(e));
    }
  };

  return (
    <>
      <Box className="settingSection">
        <Typography className="settingTitle" variant="h6">
          Account Settings
        </Typography>
        <div className="settingContainer">
          <div className="settingItem">
            <label htmlFor="accountUserName">Username</label>
            <TextField id="accountUserName" variant="outlined" value={accountInfo.username || ''} readOnly={true} />
          </div>
          <div className="settingItem">
            <label htmlFor="accountEmail">Email</label>
            <TextField id="accountEmail" variant="outlined" value={accountInfo.email || ''} readOnly={true} />
          </div>
          <div className="settingItem">
            <label htmlFor="accountMobile">Mobile</label>
            <TextField
              id="accountMobile"
              variant="outlined"
              value={accountInfo.mobile || ''}
              onChange={(e) => {
                setAccountInfo({ ...accountInfo, mobile: e.target.value });
              }}
            />
          </div>
          <div className="settingItem">
            <label htmlFor="accountType">Account Type</label>
            <TextField
              id="accountType"
              variant="outlined"
              value={accountInfo.type === 0 ? 'Student Account' : 'Company Account'}
              readOnly={true}
            />
          </div>
          <Button variant="contained">Save</Button>
        </div>
      </Box>

      <Divider sx={{ backgroundColor: '#6b8baf' }} variant="middle" />

      <Box className="settingSection">
        <Typography className="settingTitle" variant="h6">
          Password Settings
        </Typography>

        <div className="settingContainer">
          <Grid item xs={12}>
            <Typography variant="h8">Your password should:</Typography>
            <ul>
              <li> contain 6 to 20 characters</li>
              <li> and contain at least one numeric digit</li>
              <li> and contain at least one uppercase</li>
              <li>and contain at least one lowercase letter</li>
            </ul>
          </Grid>
          <div className="settingItem">
            <label id="old_password_lable" htmlFor="old_password">
              Current Password
            </label>
            <TextField
              error={empty ? true : false}
              id="old_password"
              aria-label="Current Password"
              type="password"
              onChange={(e) => changeHandler(e)}
              onBlur={(e) => {
                if (e.target.value === '') {
                  setEmpty(true);
                } else {
                  setEmpty(false);
                }
              }}
              value={passwords.old_password}
              helperText={empty ? 'Current password is required' : null}
            />
          </div>
          <div className="settingItem">
            <label id="new_password_label" htmlFor="new_password">
              New Password
            </label>
            <TextField
              error={matching === false || !ValidatePassword(passwords.new_password) ? true : false}
              aria-label="New Password"
              id="new_password"
              type="password"
              onChange={(e) => changeHandler(e)}
              value={passwords.new_password}
              helperText={getHelperText(passwords.new_password)}
            />
          </div>
          <div className="settingItem">
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
              value={passwords.new_password_confirm}
            />
          </div>

          <Button
            disabled={matching && ValidatePassword(passwords.new_password) && !empty ? false : true}
            variant="contained"
            onClick={resetPassword}
          >
            Reset Password
          </Button>
        </div>
        {success && (
          <Alert
            onClose={() => {
              setSuccess(false);
            }}
            severity="success"
          >
            You've successfully reset your password
          </Alert>
        )}
      </Box>
    </>
  );
}
