import React,{useState} from 'react'
import { HomePage } from './components/HomePage'
import Map from './components/Map'
import './App.css'


function App() {
  return (
   <div class="App">
    <Map/>
   </div> 
  )
}

export default React.memo(App)