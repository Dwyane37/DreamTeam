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
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import Logout from './Logout';
import Filter from '../component_Filter/Filter';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button, Divider } from '@mui/material';
import { apiGet } from '../API';
import SideDrawer from './Drawer';

// #########################
export default function NavBar(props) {
  React.useEffect(() => {
    props.socket?.emit('newUser', sessionStorage.getItem('id'));
  }, []);

  const type = props.type;
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = React.useState('');
  const setJobFunc = props.handleJobFetch;
  const [cancelSearch, setCancalSearch] = React.useState(false);

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
    <Menu anchorEl={anchorEl} id={menuId} keepMounted open={isMenuOpen} onClose={handleMenuClose}>
      <MenuItem onClick={navigateProfile}>
        <AccountBoxIcon /> Profile
      </MenuItem>

      <MenuItem onClick={navigateSettings}>
        <SettingsIcon />
        Settings
      </MenuItem>
      <Divider />
      <Logout socket={props.socket} />
    </Menu>
  );

  // Search

  const processCitizenshipArray = (arr) => {
    if (arr) {
      const ids = arr.map((item) => item.id);
      ids.sort();
      return ids.join('');
    }
    return '';
  };
  const handleSearch = () => {
    const right = processCitizenshipArray(filter.citizenship);
    const attr = {
      key: keyword,
      location: filter.country?.name || '',
      state: filter.state?.name || '',
      city: filter.city?.name || '',
      field: filter.field?.label || '',
      right: right || '',
    };
    console.log(attr);
    apiGet('internship/search', attr)
      .then((data) => {
        setJobFunc(data.data);
        setCancalSearch(true);
      })
      .catch((e) => alert(e));
    clear();
  };

  const clear = () => {
    setKeyword('');
    setFilter(initFilter);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#6096ba' }}>
        <Toolbar>
          {type === '0' ? <SideDrawer /> : null}
          <div>
            <Typography variant="h6" noWrap component="div" onClick={navigateHome}>
              I-Student
            </Typography>
          </div>
          {type === '0' && location.pathname === '/home' ? (
            <>
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
              <Filter handleFilter={[filter, setFilter]} />
              <Button variant="contained" style={{ marginLeft: '1rem', color: 'white' }} onClick={handleSearch}>
                Search
              </Button>
              {cancelSearch && (
                <Button
                  // variant="outlined"
                  style={{ color: 'white', marginLeft: '1rem' }}
                  onClick={() => {
                    props.setRefresh((prev) => !prev);
                    setCancalSearch(false);
                  }}
                >
                  Cancel
                </Button>
              )}
            </>
          ) : null}

          <Box sx={{ flexGrow: 1 }} />
          <Box>
            {/* <IconButton
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
            </IconButton> */}

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
    </Box>
  );
}
