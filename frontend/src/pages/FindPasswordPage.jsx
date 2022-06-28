import React from 'react';
import CodeVerify from '../components/CodeVerify';
import ChangePassword from '../components/FindPassword';
export default function FindPasswordPage() {
  const [codeCorrect, setCodeCorrect] = React.useState(false);
  return (
    <div className="find_password_page">
      <h1>Find Your Password</h1>
      {!codeCorrect && <CodeVerify verifyResult={setCodeCorrect} />}
      {codeCorrect && <ChangePassword />}
    </div>
  );
}
