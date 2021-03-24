import React,{useState} from 'react'
import { HomePage } from './components/HomePage'
import Map from './components/Map'
import EventCreateForm from './components/EventCreateForm'
import './App.css'


function App() {
  return (
   <div className="App">
    <Map/>
   </div> 
  )
}

export default React.memo(App)