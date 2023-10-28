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
        <div>
          <img src="https://seeklogo.com/images/S/squirtle-logo-0E4AE193EE-seeklogo.com.png" alt="Eliminar" style={{ width: '30%' }} />
        </div>
      </main>
    </div>
  );
}

export default WebHome

