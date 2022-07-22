import React from 'react';
import Typography from '@mui/material/Typography';
import './SavedJob.css';
import JobCard from '../components/component_JobPanel/JobCard';
import JobPanel from '../components/component_JobPanel/JobPanel';
import { Dialog } from '@mui/material';
import JobDetail from '../components/compopnent_JobDetail/JobDetail';
import NavBar from '../components/component_NavBar/NavBar';
export default function SavedJobs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
    console.log(e);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <NavBar type={localStorage.getItem('type')} />
      <div className="container-savedJob">
        <Typography component="h1" variant="h4" align="center">
          My Saved Jobs
        </Typography>
        {/* <h3>My Saved Jobs</h3> */}
        <div className="panel-savedJob">
          <JobPanel openDialog={handleClickOpen} />
        </div>
      </div>
      <div>
        <Dialog open={open} onClose={handleClose} scroll="paper" maxWidth="md">
          <JobDetail handleClose={handleClose} />
        </Dialog>
      </div>
    </div>
  );
}
