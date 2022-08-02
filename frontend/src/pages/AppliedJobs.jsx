import React from 'react';
import Typography from '@mui/material/Typography';
import './SavedJob.css';
import JobPanel from '../components/component_JobPanel/JobPanel';
import NavBar from '../components/component_NavBar/NavBar';
import { dummyJobs } from '../components/assets';
import { apiGet } from '../components/API';

export default function AppliedJobs({ socket }) {
  const [applied, setApplied] = React.useState([]);
  React.useEffect(() => {
    apiGet('/internship/getapplylist', { id: sessionStorage.getItem('id') })
      .then((data) => setApplied(data.data))
      .catch((e) => alert(e));
  }, []);
  return (
    <div>
      <NavBar type={sessionStorage.getItem('type')} socket={socket} />
      <div className="container-savedJob">
        <Typography component="h1" variant="h4" align="center">
          My Applied Jobs
        </Typography>
        {/* <h3>My Saved Jobs</h3> */}
        <div className="panel-savedJob">
          <JobPanel jobs={applied} type="applied" />
        </div>
      </div>
    </div>
  );
}
