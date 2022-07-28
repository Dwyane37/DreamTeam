import React from 'react';
import Settings from '../components/component_Setting/Setting';
import NavBar from '../components/component_NavBar/NavBar';
import Typography from '@mui/material/Typography';

export default function SettingsPage({ socket }) {
  return (
    <>
      <NavBar type={sessionStorage.getItem('type')} socket={socket} />
      <Settings />
    </>
  );
}
