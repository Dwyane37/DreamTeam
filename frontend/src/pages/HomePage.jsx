import React from 'react';
import NavBar from '../components/component_NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import JobPanel from '../components/component_JobPanel/JobPanel';
import RecommenderPanel from '../components/componen_Recommender/RecommenderPanel';
import PopularJobPanel from '../components/component_PopularJobs/PopularJobPanel';
import './HomePage.css';
export default function HomePage() {
  const navigate = useNavigate();
  const [logedIn, setLogedIn] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem('token')) {
      alert('Your are not logged in');
      navigate('/login');
    } else {
      setLogedIn(true);
    }
  }, [logedIn]);

  console.log(logedIn);
  return (
    logedIn && (
      <div>
        <NavBar type="student" />
        <div className="home-content-container">
          <JobPanel />
          <div className="home-side-panel">
            <RecommenderPanel />
            <PopularJobPanel />
          </div>
        </div>
      </div>
    )
  );
}
