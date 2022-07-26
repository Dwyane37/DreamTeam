import React from 'react';
import Button from '@mui/material/Button';
import './AccountType.css';
function AccountType(props) {
  const typename = props.typename;
  let accHandler = props.handler;
  return (
    <Button
      style={{ backgroundColor: props.colour, padding: '2rem 5rem', fontSize: 'x-large' }}
      className="account-type-button"
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
