import React from 'react';
import NavBar from '../components/component_NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import JobPanel from '../components/component_JobPanel/JobPanel';
import RecommenderPanel from '../components/componen_Recommender/RecommenderPanel';
import PopularJobPanel from '../components/component_PopularJobs/PopularJobPanel';
import './HomePage.css';
=======
import JobCard from '../components/JobCard';
// import { RegionFilter } from '../components/Filter';
>>>>>>> WuHanqiu-patch-1
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
<<<<<<< HEAD
    logedIn && (
      <div>
        <NavBar type={localStorage.getItem('type')} />
        <div className="home-content-container">
          <JobPanel />
          <div className="home-side-panel">
            <RecommenderPanel />
            <PopularJobPanel />
          </div>
        </div>
      </div>
    )
=======
    <div>
      <NavBar />
      <JobCard />
      {/* <RegionFilter /> */}
    </div>
>>>>>>> WuHanqiu-patch-1
  );
}
