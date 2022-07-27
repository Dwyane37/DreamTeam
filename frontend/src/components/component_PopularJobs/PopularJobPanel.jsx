import * as React from 'react';

import { Dialog, Paper } from '@mui/material';
import JobDetail from '../compopnent_JobDetail/JobDetail';
import SidePanelList from '../SidePanel';
import './PopularJobPanel.css';

function getJobDetail(jobs, id) {
  const job = jobs.find((job) => job.id == id);
  return job;
}

export default function PopularJobPanel(props) {
  const [open, setOpen] = React.useState(false);
  const [jobId, setJobId] = React.useState(null);

  const handleClickOpen = (e) => {
    setOpen(true);
    setJobId(e.currentTarget.id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Paper className="popular-panel">
        {/* <div className="popular-panel"> */}
        <div>Trending Search</div>
        <SidePanelList jobs={props.jobs} handleClickOpen={handleClickOpen} />
        {/* </div> */}
      </Paper>
      <Dialog open={open} onClose={handleClose} scroll="paper" maxWidth="lg">
        <JobDetail handleClose={handleClose} job={getJobDetail(props.jobs, jobId)} />
      </Dialog>
    </>
  );
}
