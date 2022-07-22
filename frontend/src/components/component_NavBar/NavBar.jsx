import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Logout from '../Logout';
import Filter from '../component_Filter/Filter';
// import FilterListIcon from '@mui/icons-material/FilterList';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { apiGet } from '../API';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: '30%',
    width: '30%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
// #########################
export default function NavBar(props) {
  const type = props.type;
  const setJobFunc = props.handleJobFetch;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [keyword, setKeyword] = React.useState('');
  const initFilter = {
    country: null,
    state: null,
    city: null,
    field: null,
    citizenship: [],
  };
  const [filter, setFilter] = React.useState(initFilter);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigateHome = () => {
    type === '0' ? navigate('/home') : navigate('/dashboard');
  };

  const navigateProfile = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  const navigateSettings = () => {
    setAnchorEl(null);
    navigate('/settings');
  };

  const navigateFollowedEmployers = () => {
    setAnchorEl(null);
    navigate('/follow');
  };

  const navigateSavings = () => {
    setAnchorEl(null);
    navigate('/saved-jobs');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu anchorEl={anchorEl} id={menuId} keepMounted open={isMenuOpen} onClose={handleMenuClose}>
      <MenuItem onClick={navigateProfile}>Profile</MenuItem>
      {type === '0' ? (
        <div>
          <MenuItem onClick={navigateFollowedEmployers}>Followed Employers</MenuItem>
          <MenuItem onClick={navigateSavings}>Saved Jobs</MenuItem>
        </div>
      ) : null}

      <MenuItem onClick={navigateSettings}>Settings</MenuItem>
      <Logout />
    </Menu>
  );

  const processCitizenshipArray = (arr) => {
    const ids = arr.map((item) => item.id);
    ids.sort();
    return ids.join(',');
  };
  const handleSearch = () => {
    console.log(keyword);
    console.log(filter);
    const attr = {
      key: keyword,
      location: filter.country.name,
      state: filter.state.name,
      city: filter.city.name,
      field: filter.field.label,
      type: processCitizenshipArray(filter.citizenship),
    };
    console.log(attr);
    // apiGet('internship/search', attr)
    //   .then((data) => setJobFunc(data))
    //   .catch((e) => alert(e));
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
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
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
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
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
    </Box>
  );
}
