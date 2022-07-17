import React from 'react';
import NavBar from '../components/component_NavBar/NavBar';
import Button from '@mui/material/Button';
import MyJobPanel from '../components/component_MyJob/MyJobPanel';
import { useNavigate } from 'react-router-dom';

import './Dashboard.css';

export default function DashboardPage() {
  return (
    <div>
      <NavBar type={localStorage.getItem('type')} />
      <div className="dashboard-main">
        <h3>My Job Posts</h3>
        <Button className="add-job-button" variant="contained" color="success">
          Add a Job Post
        </Button>
        <MyJobPanel />
      </div>
    </div>
  );
}
