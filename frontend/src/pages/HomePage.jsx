import React from 'react';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import NavBar from '../components/component_NavBar/NavBar';
import { Dialog } from '@mui/material';
import JobDetail from '../components/compopnent_JobDetail/JobDetail';
import { useNavigate } from 'react-router-dom';
import JobPanel from '../components/component_JobPanel/JobPanel';
import RecommenderPanel from '../components/componen_Recommender/RecommenderPanel';
import PopularJobPanel from '../components/component_PopularJobs/PopularJobPanel';

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
    console.log(e);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    logedIn && (
      <div>
        <NavBar type={sessionStorage.getItem('type')} handleJobFetch={getJobs} socket={socket} />
        <div className="home-content-container">
          <div className="home-main-panel">
            <div className="home-sort-button">
              <IconButton />
              <SortIcon />
            </div>
            <JobPanel openDialog={handleClickOpen} socket={socket} />
          </div>

          <div className="home-side-panel">
            <RecommenderPanel openDialog={handleClickOpen} />
            <PopularJobPanel openDialog={handleClickOpen} />
          </div>
        </div>
        <div>
          <Dialog open={open} onClose={handleClose} scroll="paper" maxWidth="lg">
            <JobDetail handleClose={handleClose} />
          </Dialog>
        </div>
      </div>
    )
  );
}
