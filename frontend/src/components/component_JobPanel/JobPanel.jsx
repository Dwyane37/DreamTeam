import * as React from 'react';
import JobCard from './JobCard';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import './JobPanel.css';
import usePagination from './usePagination';
import { Dialog } from '@mui/material';
import JobDetail from '../compopnent_JobDetail/JobDetail';

export default function JobPanel(props) {
  const jobs = props.jobs;
  const [page, setPage] = React.useState(1);
  const PER_PAGE = 2;
  const count = Math.ceil(jobs.length / PER_PAGE);
  const handleData = usePagination(jobs, PER_PAGE);

  const handlePageChange = (e, p) => {
    setPage(p);
    handleData.jump(p);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
    console.log(e);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="job-panel">
        {handleData.currentData().map((job, idx) => (
          <JobCard
            jobID={job.jobID}
            key={idx}
            title={job.title}
            company={job.company}
            location={job.region}
            briefing={job.description}
            hanldeClickOpen={handleClickOpen}
            socket={props.socket}
          />
        ))}
        <Box className="pagination">
          <Pagination count={count} page={page} onChange={handlePageChange} shape="rounded" />
        </Box>
      </div>
      <Dialog open={open} onClose={handleClose} scroll="paper" maxWidth="md">
        <JobDetail handleClose={handleClose} job={props.jobs[0]} />
      </Dialog>
    </>
  );
}
