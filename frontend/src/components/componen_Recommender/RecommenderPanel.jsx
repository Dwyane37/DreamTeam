import * as React from 'react';
import RecommenderCard from './RecommenderCard';
import './RecommenderPanel.css';
export default function RecommenderPanel() {
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
    <div className="recommender-panel">
      <div>Recommended Internships</div>
      {jobs.map((job, idx) => (
        <RecommenderCard key={idx} title={job.title} company={job.company} location={job.region} />
      ))}
    </div>
  );
}
