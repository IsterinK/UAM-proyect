import React from 'react'
import "./WebHome.scss"
import Navbar from '../../components/surfaces/NavBar';

const WebHome = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <main className="App-content">
        <div>
          <p className='content'>Mientras tanto</p>
        </div>
      </main>
    </div>
  );
}

export default WebHome

