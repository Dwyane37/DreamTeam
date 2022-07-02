import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';

export default function CodeVerify(props) {
  const [code, setCode] = React.useState('');
  const [codeCorrect, setCodeCorrect] = props.verifyResult;

  const handleSubmit = (e) => {
    if (code === localStorage.getItem('code')) {
      setCodeCorrect(true);
    } else {
      setCodeCorrect(false);
    }
    e.preventDefault();
    //TODO send code to backend
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
        error={codeCorrect === false && code !== '' ? true : false}
        aria-label="Verification Code"
        id="code"
        placeholder="abc123"
        helperText={codeCorrect === false && code !== '' ? 'Incorrect code.' : null}
        // onChange={(e) => {
        //   setCode(e.target.value);
        // }}
        onBlur={(e) => {
          setCodeCorrect(null);
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
