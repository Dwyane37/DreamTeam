import React from 'react';
import RegisterForm from '../components/component_Register/RegisterForm';
import LoginNav from '../components/component_NavBar/LoginNav';
import AccountType from '../components/component_Register/AccountType';

import './LoginRegisterPage.css';

function RegisterPage() {
  const [accType, setAccType] = React.useState('');
  const updateState = (state) => {
    setAccType(state);
  };

  return;
  // <div className="login_registerPage">
  //   <LoginNav />

  //   {accType ? (
  //     <div className="login_registerMain">
  //       <h1>{`Register as a ${accType}`}</h1>
  //       <RegisterForm account={accType} />
  //     </div>
  //   ) : (
  //     <>
  //       <h1>Select your account type</h1>
  //       <div className="selectAccountType">
  //         <AccountType typename="student" colour="#5B9279" handler={updateState} />
  //         <AccountType typename="company" colour="#91785D" handler={updateState} />
  //       </div>
  //     </>
  //   )}
  // </div>
}

export default RegisterPage;
