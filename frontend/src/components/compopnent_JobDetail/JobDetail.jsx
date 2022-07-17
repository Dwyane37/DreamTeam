import React from 'react';
import Typography from '@mui/material/Typography';
export default function JobDetail() {
  const job = {
    jobID: 1,
    title: 'Web Developer',
    company: 'Google',
    authorID: 123,
    region: {
      country: 'Australia',
      state: 'NSW',
      city: 'Sydney',
    },
    citizenship: ['Australian PR', 'Australian Citizen'],
    description: 'This is a job description',
    meetings: [
      { date: '2022-07-21', link: 'url-link-1' },
      { date: '2022-07-24', link: 'url-link-2' },
    ],
  };
  return (
    <div>
      <Typography component="h1" variant="h4" align="center">
        {job.title}
      </Typography>
      <Typography variant="subtitle1">{job.description}</Typography>
    </div>
  );
}
