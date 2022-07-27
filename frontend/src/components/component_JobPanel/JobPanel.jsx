import * as React from 'react';
import JobCard from './JobCard';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import './JobPanel.css';
import usePagination from './usePagination';
import { Dialog } from '@mui/material';
import JobDetail from '../compopnent_JobDetail/JobDetail';

function getJobDetail(jobs, id) {
  const job = jobs.filter((job) => job.id == id);
  return job[0];
}

export default function JobPanel(props) {
  const [page, setPage] = React.useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(props.jobs.length / PER_PAGE);
  const handleData = usePagination(props.jobs, PER_PAGE);

  const handlePageChange = (e, p) => {
    setPage(p);
    handleData.jump(p);
  };

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
      <div className="job-panel">
        <Grid container spacing={{ md: 3 }}>
          {handleData.currentData().map((job, idx) => (
            <Grid
              item
              xs={props.type === 'saved' ? 6 : 10}
              sm={props.type === 'saved' ? 6 : 8}
              md={props.type === 'saved' ? 6 : 8}
              lg={props.type === 'saved' ? 4 : 8}
              key={idx}
            >
              <JobCard
                type={props.type}
                jobID={job.id}
                key={idx}
                title={job.title}
                company={job.company}
                location={{ country: job.location, state: job.state, city: job.city }}
                briefing={job.description}
                hanldeClickOpen={handleClickOpen}
                socket={props.socket}
              />
            </Grid>
          ))}
        </Grid>

        <Box className="pagination">
          <Pagination count={count} page={page} onChange={handlePageChange} shape="rounded" />
        </Box>
      </div>
      <Dialog open={open} onClose={handleClose} scroll="paper" maxWidth="lg">
        <JobDetail handleClose={handleClose} job={getJobDetail(props.jobs, jobId)} />
      </Dialog>
    </>
  );
}
