import React from 'react';
import CodeVerify from '../components/CodeVerify';
import FindPassword from '../components/FindPassword';

export default function FindPasswordPage() {
  const [codeCorrect, setCodeCorrect] = React.useState(null);
  return (
    <div className="find_password_page">
      <h1>Find Your Password</h1>
      {!codeCorrect && <CodeVerify verifyResult={[codeCorrect, setCodeCorrect]} />}
      {codeCorrect && <FindPassword />}
    </div>
  );
}
