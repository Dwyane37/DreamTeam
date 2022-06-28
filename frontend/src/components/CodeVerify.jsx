import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';

export default function CodeVerify(props) {
  const [code, setCode] = React.useState('');
  const setCodeCorrect = props.verifyResult;
  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO send code to backend
    console.log('code submit');
    setCodeCorrect(true);
  };

  return (
    <Box
      className="verification_code_box"
      component="form"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <label htmlFor="code">Enter the code you received</label>
      <TextField
        aria-label="Verification Code"
        id="code"
        placeholder="abc123"
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></TextField>
      <div style={{ textAlign: 'right' }}>
        <Button type="submit" variant="text">
          Confirm
        </Button>
      </div>
    </Box>
  );
}
