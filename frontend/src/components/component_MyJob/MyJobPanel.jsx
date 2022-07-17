import * as React from 'react';
import MyJobCard from './MyJobCard';
import Pagination from '@mui/material/Pagination';
import usePagination from '../component_JobPanel/usePagination';
import { jobs } from '../assets';

export default function MyJobPanel() {
  const [page, setPage] = React.useState(1);
  const PER_PAGE = 1;
  const count = Math.ceil(jobs.length / PER_PAGE);
  const handleData = usePagination(jobs, PER_PAGE);

  const handlePageChange = (e, p) => {
    setPage(p);
    handleData.jump(p);
  };

  return (
    <div className="job-panel">
      {handleData.currentData().map((job, idx) => (
        <MyJobCard key={idx} title={job.title} company={job.company} location={job.region} briefing={job.description} />
      ))}
      <Pagination count={count} page={page} onChange={handlePageChange} shape="rounded" />
    </div>
  );
}
