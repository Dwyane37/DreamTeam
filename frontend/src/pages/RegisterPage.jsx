import React from 'react';
import RegisterForm from '../components/component_Register/RegisterForm';
import LoginNav from '../components/LoginNav';
import AccountType from '../components/component_Register/AccountType';
function RegisterPage() {
  const [accType, setAccType] = React.useState('');
  const updateState = (state) => {
    setAccType(state);
  };

  return (
    <div className="login_registerPage">
      <LoginNav />

      {accType ? (
        <div className="login_registerMain">
          <h1>{`Register as a ${accType}`}</h1>
          <RegisterForm account={accType} />
        </div>
      ) : (
        <>
          <h1>Select your account type</h1>
          <div>
            <AccountType typename="student" colour="orange" handler={updateState} />
            <AccountType typename="company" handler={updateState} />
          </div>
        </>
      )}
    </div>
  );
}

export default RegisterPage;
