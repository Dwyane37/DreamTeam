import * as React from 'react';
import SimpleJobCard from '../component_SimpleJobCard/SimpleJobCard';
import RefreshIcon from '@mui/icons-material/Refresh';
import './RecommenderPanel.css';
import { apiGet } from '../API';
import { jobs } from '../assets';
export default function RecommenderPanel(props) {
  // React.useEffect(() => {
  //   apiGet('internship/recommand', { token: localStorage.getItem('token') })
  //     .then((data) => console.log(data))
  //     .catch((e) => alert(e));
  // }, []);

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
        <SimpleJobCard
          key={idx}
          title={job.title}
          company={job.company}
          location={job.region}
          hanldeClickOpen={props.openDialog}
        />
      ))}
    </div>
  );
}
