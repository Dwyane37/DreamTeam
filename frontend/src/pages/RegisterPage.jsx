import React from 'react';
import RegisterForm from '../components/RegisterForm';
import LoginNav from '../components/LoginNav';
import AccountType from '../components/AccountType';
function RegisterPage() {
  const [accType, setAccType] = React.useState('');
  const updateState = (state) => {
    setAccType(state);
  };

  return (
    <div className="login_registerPage">
      <LoginNav />
      <h1>Select your account type</h1>
      <div>
        <AccountType typename="Student" colour="orange" handler={updateState} />
        <AccountType typename="Company" handler={updateState} />
      </div>

      {accType ? (
        <div className="login_registerMain">
          <h1>Register</h1>
          <RegisterForm account={accType} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default RegisterPage;
