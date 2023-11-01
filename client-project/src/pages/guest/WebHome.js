import React from 'react'
import "./WebHome.scss"
import Navbar from '../../components/surfaces/NavBar';

const WebHome = () => {
  return (
    <div className='main'>
      <div className='main-container'>
        <div className='nav-container'>
          <Navbar></Navbar>
        </div>
      </div> 
    </div>
  );
}

export default WebHome

