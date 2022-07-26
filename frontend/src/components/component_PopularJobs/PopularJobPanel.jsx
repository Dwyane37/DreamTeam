import * as React from 'react';
import SimpleJobCard from '../component_SimpleJobCard/SimpleJobCard';
import { Dialog } from '@mui/material';
import JobDetail from '../compopnent_JobDetail/JobDetail';
import './PopularJobPanel.css';
export default function PopularJobPanel(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="popular-panel">
        <div>Popular Internships</div>
        {props.jobs.map((job, idx) => (
          <SimpleJobCard
            key={idx}
            title={job.title}
            company={job.company}
            location={job.region}
            hanldeClickOpen={handleClickOpen}
          />
        ))}
      </div>
      <Dialog open={open} onClose={handleClose} scroll="paper" maxWidth="md">
        <JobDetail handleClose={handleClose} job={props.jobs[0]} />
      </Dialog>
    </>
  );
}
