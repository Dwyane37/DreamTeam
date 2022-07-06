import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { apiGet } from './API';

function LoginForm() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    apiGet('user/login', { username, password })
      .then((body) => {
        console.log(body);
        localStorage.setItem('token', body.errormessage);
        navigate('/home');
      })
      .catch((e) => alert(e));
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
        aria-label="Username input"
        id="loginEmail"
        label="Username"
        onChange={(e) => {
          setUsername(e.target.value);
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
