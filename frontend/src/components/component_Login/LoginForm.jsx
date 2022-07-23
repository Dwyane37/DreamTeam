import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { apiGet } from '../API';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    apiGet('user/login', { username, password })
      .then((body) => {
        console.log(body);
        sessionStorage.setItem('token', body.errormessage.token);
        sessionStorage.setItem('id', body.errormessage.id);
        sessionStorage.setItem('type', body.errormessage.type);
        sessionStorage.getItem('type') === '0' ? navigate('/home') : navigate('/dashboard');
      })
      .catch((e) => alert(e));
  };

  return (
    <Box
      className="login_Form"
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
      <div className="login-button">
        <Button type="submit" variant="outlined">
          Login
        </Button>
      </div>
    </Box>
  );
}

export default LoginForm;
