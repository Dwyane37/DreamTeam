import React from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import JobPanel from '../components/component_JobPanel/JobPanel';
import RecommenderPanel from '../components/componen_Recommender/RecommenderPanel';
import PopularJobPanel from '../components/component_PopularJobs/PopularJobPanel';
import './HomePage.css';
export default function HomePage() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      alert('Your are not logged in');
    }
  }, []);
  return (
    <div>
      <NavBar />
      <div className="home-content-container">
        <JobPanel />
        <div className="home-side-panel">
          <RecommenderPanel />
          <PopularJobPanel />
        </div>
      </div>
    </div>
  );
}
