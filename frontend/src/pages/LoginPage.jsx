import LoginForm from '../components/component_Login/LoginForm';
import React from 'react';
import LoginNav from '../components/component_NavBar/LoginNav';
import ForgotPassword from '../components/component_ForgottenPassword/ForgotPassword';
import SignInSide from './SignIn';

import './LoginRegisterPage.css';

function LoginPage({ socket }) {
  return (
    <SignInSide />
    // <div className="login_registerPage">
    //   <LoginNav />
    //   <div className="login_registerMain">
    //     <h1>Login</h1>
    //     <LoginForm />
    //     <ForgotPassword />
    //   </div>
    // </div>
  );
}
export default LoginPage;
