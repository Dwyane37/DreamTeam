import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../API';
import { ValidateEmail } from '../assets';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    apiGet('/user/forget', { email })
      .then((body) => {
        sessionStorage.setItem('code', body.errormessage);
        sessionStorage.setItem('email', email);
        navigate('/find_password');
      })
      .catch((e) => alert(e));
  };

  return (
    <div>
      <p onClick={handleClickOpen}>Forgotten Password</p>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Need help with your password?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the email you use for I-Student, and we will send you a code to verify your account.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            helperText={ValidateEmail(email) ? null : ' Incorrect email format'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!email || !ValidateEmail(email)} onClick={handleSend}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
