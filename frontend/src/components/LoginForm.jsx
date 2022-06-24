import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  };

  return (
    <Box
      className="login_registerForm"
      component="form"
      onSubmit={(e) => {
        login(e);
      }}
    >
      <TextField
        aria-label="Email input"
        id="loginEmail"
        label="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        id="loginPassword"
        label="Password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button type="submit" variant="outlined">
        Login
      </Button>
    </Box>
  );
}

export default LoginForm;
