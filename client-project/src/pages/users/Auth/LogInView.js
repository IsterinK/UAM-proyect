import React from 'react';
import LogIn from '../../../components/Auth/LogIn/LogIn';
import './LogInView.scss';

const LogInView = () => {
  return (
    <div className='view-container'>
      <div className='bg'>
        <div className='login-container'>
          <LogIn />
        </div>
      </div>
    </div>
  );
};

export default LogInView;
