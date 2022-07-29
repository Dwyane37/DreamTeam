import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { apiCall } from '../API';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Logout({ socket }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    // id = sessionStorage.getItem('id') ? sessionStorage.getItem('id') : 1
    apiCall('user/logout', { token: sessionStorage.getItem('token') })
      .then((body) => {
        setOpen(false);
        socket.disconnect();
        navigate('/');
        sessionStorage.clear();
      })
      .catch((e) => alert(e));
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Logout
      </Button> */}
      <MenuItem onClick={handleClickOpen}>
        <LogoutIcon />
        Logout
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure to log out?'}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no
            apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogOut} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
