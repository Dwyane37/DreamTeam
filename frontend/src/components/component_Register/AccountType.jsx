import React from 'react';
import Button from '@mui/material/Button';

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
