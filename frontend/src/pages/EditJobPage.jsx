import EditJobForm from '../components/component_AddJobForm/EditJobForm';
import React from 'react';
import { Button } from '@mui/material';
import './EditJobPage.css';
import { useNavigate } from 'react-router-dom';

function EditJobPage() {
  const navigate = useNavigate();
  return (
    <div className="EditJobMain">
      <Button
        variant="contained"
        className="returnBtn"
        onClick={() => {
          navigate('/dashboard');
        }}
      >
        Return
      </Button>
      <h1>Edit job</h1>
      <EditJobForm />
    </div>
  );
}

export default EditJobPage;
