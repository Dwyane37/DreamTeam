import * as React from 'react';
import JobCard from './JobCard';
import './JobPanel.css';

export default function JobPanel() {
  const jobs = [
    {
      title: 'Web Developer',
      company: 'Google',
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
    },
    {
      title: 'Data Analysis',
      company: 'Microsoft',
      region: {
        country: 'Australia',
        state: 'NSW',
        city: 'North Sydney',
      },
      citizenship: ['Australian PR', 'Australian Citizen'],
      description: 'This is a job description',
      meetings: [
        { date: '2022-07-22', link: 'url-link-3' },
        { date: '2022-07-24', link: 'url-link-4' },
      ],
    },
  ];

  return (
    <div className="job-panel">
      {jobs.map((job, idx) => (
        <JobCard key={idx} title={job.title} company={job.company} location={job.region} briefing={job.description} />
      ))}
    </div>
  );
}
