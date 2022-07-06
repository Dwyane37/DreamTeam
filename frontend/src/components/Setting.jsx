import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { apiGet } from './API';
import './Setting.css';
export default function Settings() {
  const [passwords, setPasswords] = React.useState({
    old_password: '',
    new_password: '',
    new_password_confirm: '',
  });
  const [matching, setMatching] = React.useState(null);
  const [empty, setEmpty] = React.useState(null);

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

  const resetPassword = () => {
    if (matching && passwords.old_password !== '') {
      apiGet('user/changepassword', {
        token: localStorage.getItem('token'),
        old_password: passwords.old_password,
        new_password: passwords.new_password,
      })
        .then((body) => {
          console.log(body);
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
            <TextField id="accountUserName" variant="outlined" />
          </div>
          <div className="settingItem">
            <label htmlFor="accountEmail">Email</label>
            <TextField id="accountEmail" variant="outlined" />
          </div>
          <div className="settingItem">
            <label htmlFor="accountMobile">Mobile</label>
            <TextField id="accountMobile" variant="outlined" />
          </div>
          <div className="settingItem">
            <label htmlFor="accountType">Account Type</label>
            <TextField id="accountType" variant="outlined" />
          </div>
        </div>
      </Box>
      <Box className="settingSection">
        <Typography className="settingTitle" variant="h6">
          Password Settings
        </Typography>
        <div className="settingContainer">
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
              helperText={empty ? 'Current password is required' : null}
            />
          </div>
          <div className="settingItem">
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
          </div>
          <div className="settingItem">
            <label id="new_password_confirm_label" htmlFor="new_password_confirm">
              Confirm Password
            </label>
            <TextField
              error={matching === false ? true : false}
              aria-label="Confirme Password"
              id="new_password_confirm"
              type="password"
              onChange={(e) => changeHandler(e)}
              helperText={matching === false ? 'Passwords do not match' : null}
            />
          </div>

          <Button variant="outlined" onClick={resetPassword}>
            Reset Password
          </Button>
        </div>
      </Box>
    </>
  );
}
