import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { WelcomeModal } from './WelcomeModal';
import Modal from './Modal';
import { HomePage } from './HomePage'

function App() {
  // const openWelcome = () => {
  //   setWelcome(prev => !prev);
  // }
  return (
    <>
      <div className="App">
        {/* <WelcomeModal showWelcome={showWelcome} setWelcome={setWelcome} />     */}
        <HomePage />  
      </div>
    </>
    
  );
}

export default App;
