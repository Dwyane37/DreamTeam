import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLocation, useNavigate } from 'react-router-dom';

function LoginNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  let value = false;
  switch (pathname) {
    case '/login':
      value = 0;
      break;
    case '/register':
      value = 1;
      break;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} aria-label="navigation bar" textColor="inherit">
          <Tab id="TabLogin" label="Login" onClick={() => navigate('/login')} />
          <Tab id="TabRegister" label="Register" onClick={() => navigate('/register')} />
        </Tabs>
      </Box>
    </Box>
  );
}
export default LoginNav;
