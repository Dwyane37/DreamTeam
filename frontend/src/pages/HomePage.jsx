import React from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard';

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
      <JobCard />
    </div>
  );
}
