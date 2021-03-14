import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { HomePage } from './HomePage'

function App() {
  return (
      <div>
        <HomePage />  
      </div>
    
  );
}

export default React.memo(App);
