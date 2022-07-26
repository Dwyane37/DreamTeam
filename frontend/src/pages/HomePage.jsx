import React from 'react';

import NavBar from '../components/component_NavBar/NavBar';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import JobPanel from '../components/component_JobPanel/JobPanel';
import RecommenderPanel from '../components/componen_Recommender/RecommenderPanel';
import PopularJobPanel from '../components/component_PopularJobs/PopularJobPanel';
import { dummyJobs } from '../components/assets';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './HomePage.css';
import { apiCall, apiGet } from '../components/API';

export default function HomePage({ socket }) {
  const navigate = useNavigate();
  const [jobs, getJobs] = React.useState([]);
  const [hotJobs, getHotJobs] = React.useState([]);
  const [recommend, getRecommend] = React.useState([]);
  const [logedIn, setLogedIn] = React.useState(false);

  React.useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      alert('Your are not logged in');
      navigate('/login');
    } else {
      setLogedIn(true);
    }
    socket?.emit('newUser', sessionStorage.getItem('id'));
  }, [logedIn]);

  React.useEffect(() => {
    // apiGet('internship/gethotjobs', null)
    //   .then((data) => getHotJobs(data))
    //   .catch((e) => alert(e));
    // apiCall('internship/home', null)
    //   .then((data) => getJobs(data))
    //   .catch((e) => alert(e));
    // apiGet('internship/recommand', { token: sessionStorage.getItem('token') })
    //   .then((data) => getRecommend(data))
    //   .catch((e) => alert(e));
  }, []);

  const mdTheme = createTheme();

  return (
    logedIn && (
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CssBaseline />

          <NavBar type={sessionStorage.getItem('type')} handleJobFetch={getJobs} socket={socket} />
          <div className="home-content-container">
            <div className="home-main-panel">
              {/* <div className="home-sort-button">
                <IconButton />
                <SortIcon />
              </div> */}
              <JobPanel socket={socket} jobs={dummyJobs} />
            </div>

            <div className="home-side-panel">
              <RecommenderPanel jobs={dummyJobs} />
              <PopularJobPanel jobs={dummyJobs} />
            </div>
          </div>
        </Box>
      </ThemeProvider>
    )
  );
}
