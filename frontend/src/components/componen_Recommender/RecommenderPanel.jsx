import * as React from 'react';
import SimpleJobCard from '../component_SimpleJobCard/SimpleJobCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import './RecommenderPanel.css';
import { Dialog } from '@mui/material';
import JobDetail from '../compopnent_JobDetail/JobDetail';

function getJobDetail(jobs, id) {
  const job = jobs.filter((job) => job.id == id);
  return job[0];
}

export default function RecommenderPanel(props) {
  const handleRefresh = () => {
    const shuffled = [...props.jobs].sort(() => 0.5 - Math.random());
    console.log('fetch new recommendations');
    setCurrentDisplay(shuffled.slice(0, 3));
  };

  const [open, setOpen] = React.useState(false);
  const [jobId, setJobId] = React.useState(null);
  const [currentDisplay, setCurrentDisplay] = React.useState(props.jobs.slice(0, 3));

  const handleClickOpen = (e) => {
    setOpen(true);
    setJobId(e.currentTarget.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="recommender-panel">
        <div>Recommended for you</div>
        <div className="recommender-refresh" onClick={handleRefresh}>
          <RefreshIcon fontSize="small" />
          <span>Click to get more recommendations</span>
        </div>
        {props.jobs.map((job, idx) => (
          <SimpleJobCard
            key={idx}
            jobID={job.id}
            title={job.title}
            company={job.company || 'company'}
            location={{ country: job.location, state: job.state, city: job.city }}
            hanldeClickOpen={handleClickOpen}
          />
        ))}
        {props.jobs.length === 0 && <p>Complete profile to get recommendations</p>}
      </div>

      <Dialog open={open} onClose={handleClose} scroll="paper" maxWidth="md">
        <JobDetail handleClose={handleClose} job={getJobDetail(props.jobs, jobId)} />
      </Dialog>
    </>
  );
}
