import React from 'react';
import JobCard from '../components/component_JobPanel/JobCard';
import JobPanel from '../components/component_JobPanel/JobPanel';
import NavBar from '../components/component_NavBar/NavBar';
export default function SavedJobs() {
  return (
    <div>
      <NavBar type={localStorage.getItem('type')} />
      <h3>My Saved Jobs</h3>
      <JobPanel />
    </div>
  );
}
