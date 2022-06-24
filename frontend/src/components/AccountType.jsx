import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function AccountType(props) {
  const typename = props.typename;
  let accHandler = props.handler;
  return (
    <Button
      style={{ backgroundColor: props.colour }}
      variant="contained"
      onClick={() => {
        accHandler(typename);
      }}
    >
      {typename}
    </Button>
  );
}

export default AccountType;
