import React from 'react'
import SignUp from '../../../components/Auth/SignUp/SignUp';
import "./RegisterView.scss"

const RegisterView = () => {
    return (
        <div className='view-container-reg '>
          <div className='bg-reg'>
            <div className='register-container'>
              <SignUp />
            </div>
          </div>
        </div>
    );
}

export default RegisterView
