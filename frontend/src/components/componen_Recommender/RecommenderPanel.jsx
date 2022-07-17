import * as React from 'react';
import SimpleJobCard from '../component_SimpleJobCard/SimpleJobCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import './RecommenderPanel.css';
import { apiGet } from '../API';
export default function RecommenderPanel() {
  // React.useEffect(() => {
  //   apiGet('internship/recommand', { token: localStorage.getItem('token') })
  //     .then((data) => console.log(data))
  //     .catch((e) => alert(e));
  // }, []);
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

  const handleRefresh = () => {
    console.log('fetch new recommendations');
  };

  return (
    <div className="recommender-panel">
      <div>Recommended Internships</div>
      <div className="recommender-refresh" onClick={handleRefresh}>
        <RefreshIcon fontSize="small" />
        <span>Click to get more recommendations</span>
      </div>
      {jobs.map((job, idx) => (
        <SimpleJobCard key={idx} title={job.title} company={job.company} location={job.region} />
      ))}
    </div>
  );
}
