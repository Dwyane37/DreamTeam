import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
const handleSubmit = () => {
  // TODO post new password to backend
};

export default function FindPassword() {
  const [passwords, setPasswords] = React.useState({ new_password: '', new_password_confirm: '' });
  const [matching, setMatching] = React.useState(null);
  const changeHandler = (e) => {
    setPasswords({ ...passwords, [e.target.id]: e.target.value });
  };

  React.useEffect(() => {
    if (passwords.new_password_confirm !== '') {
      if (passwords.new_password !== passwords.new_password_confirm) {
        setMatching(false);
      } else {
        setMatching(true);
      }
    }
  }, [passwords]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(passwords);

    // TODO submit new password
  };
  return (
    <Box component="form" className="find_password_form" onSubmit={(e) => handleSubmit(e)}>
      <h3>Set your new password</h3>
      <label id="new_password_label" htmlFor="new_password">
        New Password
      </label>
      <TextField aria-label="New Password" id="new_password" type="password" onChange={(e) => changeHandler(e)} />
      <label id="new_password_confirm_label" htmlFor="new_password_confirm">
        Confirm Password
      </label>
      <TextField
        aria-label="Confirme Password"
        id="new_password_confirm"
        type="password"
        onChange={(e) => changeHandler(e)}
      />

      <div style={{ textAlign: 'right' }}>
        {matching === false ? <p>Passwords do not match.</p> : null}
        <Button disabled={matching ? false : true} type="submit">
          Submit
        </Button>
      </div>
    </Box>
  );
}
