import React from 'react';
import NavBar from '../components/component_NavBar/NavBar';
import Button from '@mui/material/Button';
import MyJobPanel from '../components/component_MyJob/MyJobPanel';
import JobPanel from '../components/component_JobPanel/JobPanel';
import { useNavigate } from 'react-router-dom';
import { dummyJobs } from '../components/assets';

import './Dashboard.css';
import { apiGet } from '../components/API';

export default function DashboardPage({ socket }) {
  const navigate = useNavigate();
  const [logedIn, setLogedIn] = React.useState(false);
  const [jobs, setJobs] = React.useState([]);

  function AddJob() {
    navigate('/addjob');
  }
  React.useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      alert('Your are not logged in');
      navigate('/login');
      //setLogedIn(true);
    } else {
      setLogedIn(true);
    }
    socket?.emit('newUser', sessionStorage.getItem('id'));
  }, [logedIn]);

  React.useEffect(() => {
    apiGet('internship/get_all_intern', { user_id: sessionStorage.getItem('id') }).then((data) => console.log(data));
  }, []);

  return (
    logedIn && (
      <div>
        <NavBar type={sessionStorage.getItem('type')} socket={socket} />
        <div className="dashboard-main">
          <h3>My Job Posts</h3>
          <Button className="add-job-button" variant="contained" color="success" onClick={AddJob}>
            Add a Job Post
          </Button>
          <div className="jobSection">
            <JobPanel jobs={jobs} type="myJob" />
          </div>
        </div>
      </div>
    )
  );
}
