import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const Auth = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6ff] to-[#f0ebff]">
      {isLogin ? (
        <Login
          onLogin={onAuthSuccess}
          onSwitchToSignup={() => setIsLogin(false)}
        />
      ) : (
        <Signup
          onSignup={onAuthSuccess}
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
  );
};

export default Auth;
