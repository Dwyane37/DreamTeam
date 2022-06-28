import LoginForm from '../components/LoginForm';
import React from 'react';
import LoginNav from '../components/LoginNav';
import ForgotPassword from '../components/ForgotPassword';

function LoginPage() {
  //   localStorage.setItem('authToken', '');
  //   localStorage.setItem('email', '');
  return (
    <div className="login_registerPage">
      <LoginNav />
      <div className="login_registerMain">
        <h1>Login</h1>
        <LoginForm />
      </div>
      <ForgotPassword />
    </div>
  );
}
export default LoginPage;
