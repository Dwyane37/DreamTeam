import React from 'react';
import Settings from '../components/Setting';
import NavBar from '../components/NavBar';
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
