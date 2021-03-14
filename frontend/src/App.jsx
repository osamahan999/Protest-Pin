import React,{useState} from 'react'
import { HomePage } from './components/HomePage'
import './App.css'


function App() {
  return (
   <div class="App">
     <HomePage />
   </div> 
  )
}

export default React.memo(App)