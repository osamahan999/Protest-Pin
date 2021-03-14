import React,{useState} from 'react'
import { HomePage } from './HomePage'

function App() {
  return (
   <div>
     <HomePage />  
   </div> 
  )
}

export default React.memo(App)