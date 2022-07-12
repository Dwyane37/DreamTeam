import React from 'react';
import Settings from '../components/component_Setting/Setting';
import NavBar from '../components/component_NavBar/NavBar';
import Typography from '@mui/material/Typography';

export default function SettingsPage() {
  return (
    <>
      <NavBar />
      <Typography variant="h5">Settings</Typography>
      <Settings />
    </>
  );
}
