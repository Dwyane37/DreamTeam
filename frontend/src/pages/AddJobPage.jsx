import AddJobForm from '../components/component_AddJobForm/AddJobForm';
import React from 'react';
import { Button } from '@mui/material';
import './AddJobPage.css';
import { useNavigate } from 'react-router-dom';

function AddJobPage({ socket }) {
  const navigate = useNavigate();
  return (
    <div className="AddJobMain">
      <Button
        variant="contained"
        className="returnBtn"
        onClick={() => {
          navigate('/dashboard');
        }}
      >
        Return
      </Button>
      <h1>Add a job</h1>
      <AddJobForm socket={socket} />
    </div>
  );
}

export default AddJobPage;
