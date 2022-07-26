import * as React from 'react';
import SimpleJobCard from '../component_SimpleJobCard/SimpleJobCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import './RecommenderPanel.css';
import { Dialog } from '@mui/material';
import JobDetail from '../compopnent_JobDetail/JobDetail';
export default function RecommenderPanel(props) {
  const handleRefresh = () => {
    console.log('fetch new recommendations');
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="recommender-panel">
        <div>Recommended Internships</div>
        <div className="recommender-refresh" onClick={handleRefresh}>
          <RefreshIcon fontSize="small" />
          <span>Click to get more recommendations</span>
        </div>
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
