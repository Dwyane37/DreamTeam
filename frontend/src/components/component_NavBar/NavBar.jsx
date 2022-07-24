import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Search, SearchIconWrapper, StyledInputBase } from './Search';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Logout from '../Logout';
import Filter from '../component_Filter/Filter';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { apiGet } from '../API';

// #########################
export default function NavBar(props) {
  const type = props.type;
  const navigate = useNavigate();
  const [keyword, setKeyword] = React.useState('');
  const setJobFunc = props.handleJobFetch;

  const initFilter = {
    country: null,
    state: null,
    city: null,
    field: null,
    citizenship: [],
  };
  const [filter, setFilter] = React.useState(initFilter);

  const navigateHome = () => {
    type === '0' ? navigate('/home') : navigate('/dashboard');
  };

  const navigateProfile = () => {
    setanchorEl(null);
    navigate(`/profile/${sessionStorage.getItem('id')}`);
  };

  const navigateSettings = () => {
    setanchorEl(null);
    navigate('/settings');
  };

  const navigateFollowedEmployers = () => {
    setanchorEl(null);
    navigate('/follow');
  };

  const navigateSavings = () => {
    setanchorEl(null);
    navigate('/saved-jobs');
  };

  // Menu
  const [anchorEl, setanchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setanchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setanchorEl(null);
  };
  const menuId = 'account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
      // anchorOrigin={{
      //   vertical: 'top',
      //   horizontal: 'right',
      // }}
      // transformOrigin={{
      //   vertical: 'top',
      //   horizontal: 'right',
      // }}
    >
      <MenuItem onClick={navigateProfile}>Profile</MenuItem>
      {type === '0' ? (
        <div>
          <MenuItem onClick={navigateFollowedEmployers}>Followed Employers</MenuItem>
          <MenuItem onClick={navigateSavings}>Saved Jobs</MenuItem>
        </div>
      ) : null}

      <MenuItem onClick={navigateSettings}>Settings</MenuItem>
      <Logout socket={props.socket} />
    </Menu>
  );

  // notification display
  const [anchorElNotify, setAnchorElNotify] = React.useState(null);

  const isNotifyOpen = Boolean(anchorElNotify);

  const handleNotificationOpen = (event) => {
    setAnchorElNotify(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorElNotify(null);
  };
  const [notifications, setNotifications] = React.useState([]);

  const notificationId = 'notifications';
  const renderNotification = (
    <Menu
      anchorEl={anchorElNotify}
      id={notificationId}
      keepMounted
      open={isNotifyOpen}
      onClose={handleNotificationClose}
    >
      {notifications.map((notification, idx) => (
        <Paper key={idx}>{notification}</Paper>
      ))}
      <Button variant="contained">Mark As Read</Button>
    </Menu>
  );

  React.useEffect(() => {
    setNotifications(['notification 1', 'notification 2']);
    console.log(notifications);
  }, []);

  React.useEffect(() => {
    props.socket?.on('getApplication', (data) => {
      console.log(data.msg);
      setNotifications((prev) => [...prev, data.msg]);
    });
  }, [props.socket]);

  // Search

  const processCitizenshipArray = (arr) => {
    if (arr) {
      const ids = arr.map((item) => item.id);
      ids.sort();
      return parseInt(ids.join(''));
    }
    return '';
  };
  const handleSearch = () => {
    if (!keyword) {
      alert('Cannot leave search box empty');
    } else {
      const right = processCitizenshipArray(filter.citizenship);
      const attr = {
        key: keyword,
        location: filter.country?.name || '',
        state: filter.state?.name || '',
        city: filter.city?.name || '',
        field: filter.field?.label || '',
        right: right || 0,
      };
      console.log(attr);
      apiGet('internship/search', attr)
        .then((data) => setJobFunc(data))
        .catch((e) => alert(e));
      clear();
    }
  };

  const clear = () => {
    setKeyword('');
    setFilter(initFilter);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#6096ba' }}>
        <Toolbar>
          <div style={{ border: '1px solid white', padding: '0.7rem 0.5rem', borderRadius: '10%' }}>
            <Typography variant="h6" noWrap component="div" onClick={navigateHome}>
              I-Student
            </Typography>
          </div>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Search>
          {type === '0' ? <Filter handleFilter={[filter, setFilter]} /> : null}
          <Button style={{ color: 'white', marginLeft: '1rem' }} onClick={handleSearch}>
            Search
          </Button>

          <Box sx={{ flexGrow: 1 }} />
          <Box>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="start"
              aria-label="notifications"
              color="inherit"
              aria-controls={notificationId}
              onClick={handleNotificationOpen}
            >
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderNotification}
    </Box>
  );
}
