import React from 'react';
// import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
// import { apiCall, emailValid, passwordValid } from './Helper';
// import styles from './Style.module.css';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../API';
import './RegisterForm.css';

function RegisterForm(props) {
  const type = props.account;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setName] = React.useState('');
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    apiPost('user/register', { username, password, email, type })
      .then((body) => {
        console.log(body);
        navigate('/login');
      })
      .catch((e) => alert(e));
  };

  return (
    <Box
      className="register_Form"
      component="form"
      onSubmit={(e) => {
        register(e);
      }}
    >
      <TextField
        required
        id="emailRegister"
        label="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        required
        id="passwordRegister"
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField required id="nameRegister" label="Username" onChange={(e) => setName(e.target.value)} />
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button id="registerCancel" variant="outlined" color="error" onClick={() => navigate('/login')}>
          Cancel
        </Button>
        <Button id="registerButton" variant="outlined" type="submit">
          Register
        </Button>
      </Box>
    </Box>
  );
}

// RegisterForm.propTypes = {
//   submit: PropTypes.func
// };

export default RegisterForm;
