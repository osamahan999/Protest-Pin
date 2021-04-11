import React,{useState} from 'react'

import Map from './components/Map'
import { ModalContainer } from './components/ModalContainer'

import './App.css'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";



function App() {
  return (
    <>
   <div class="App">
      <Map/>
   </div> 

   </>
   
  )
}

export default React.memo(App)