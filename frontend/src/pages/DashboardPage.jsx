import React from 'react';
import NavBar from '../components/component_NavBar/NavBar';
import Button from '@mui/material/Button';
import MyJobPanel from '../components/component_MyJob/MyJobPanel';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <div>
      <NavBar type="company" />
      <div>
        <h4>My Job Posts</h4>
        <Button variant="outlined">Add a Job Post</Button>
        <MyJobPanel />
      </div>
    </div>
  );
}
