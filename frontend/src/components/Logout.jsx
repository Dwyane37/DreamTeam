import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { apiCall } from '../components/API';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';


export default function Logout () {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogOut = () => {
    // id = localStorage.getItem('id') ? localStorage.getItem('id') : 1
    apiCall('user/logout', { id: 1 }).then((body) => {
      if (body) {
        console.log(body);
        setOpen(false);
        navigate('/')
        localStorage.clear()
      }

    });

  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Logout
      </Button> */}
      <MenuItem onClick={handleClickOpen}>Logout</MenuItem>
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
