import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { IconButton, Button } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OutboxIcon from '@mui/icons-material/Outbox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from 'react-router-dom';

export default function SideDrawer() {
  const [state, setState] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

  const navigateFollowedEmployers = () => {
    setState(false);
    navigate('/follow');
  };

  const navigateSavings = () => {
    setState(false);
    navigate('/saved-jobs');
  };

  // const navigateApplications = () => {
  //   setState(false);
  //   navigate('/applied-jobs');
  // };

  const navigateCommentHistory = () => {
    setState(false);
    navigate('/comment-history');
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      {sessionStorage.getItem('type') == 0 && (
        <List>
          <ListItem id="saved-job" disablePadding onClick={navigateSavings}>
            <ListItemButton>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary={'Saved Jobs'} />
            </ListItemButton>
          </ListItem>
          {/* <ListItem id="applied-job" disablePadding onClick={navigateApplications}>
            <ListItemButton>
              <ListItemIcon>
                <OutboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Applied Jobs'} />
            </ListItemButton>
          </ListItem> */}
          <ListItem id="followed-employer" disablePadding onClick={navigateFollowedEmployers}>
            <ListItemButton>
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
              <ListItemText primary={'Followed Employer'} />
            </ListItemButton>
          </ListItem>
        </List>
      )}

      <Divider />
      {/* <List>
        <ListItem disablePadding onClick={navigateCommentHistory}>
          <ListItemButton>
            <ListItemIcon>
              <CommentIcon />
            </ListItemIcon>
            <ListItemText primary={'Comment History'} />
          </ListItemButton>
        </ListItem>
      </List> */}
    </Box>
  );

  return (
    <div>
      {/* <Button onClick={toggleDrawer(true)}>LEFT</Button> */}

      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
