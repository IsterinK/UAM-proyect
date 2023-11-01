import React from 'react'
import "./WebHome.scss"
import Navbar from '../../components/surfaces/NavBar';
import Present from './Present';
import About from './About';

const WebHome = () => {
  return (
    <div className='main'>
      <div className='nav-container'>
        <Navbar></Navbar>
      </div>
      <div className='spa'>
        <Present></Present>
        {/* <About></About> */}
      </div>
    </div>
  );
}

export default WebHome

