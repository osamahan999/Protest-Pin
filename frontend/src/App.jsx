import React,{useState, useEffect} from 'react'
//import { ModalContainer } from './components/ModalContainer'
import WelcomeModal from './components/WelcomeModal'
import { LoginModal } from './components/LoginModal'
import { SignUpModal } from './components/SignUpModal'
import Profile from './components/ProfilePage'
import { getToken } from './helper'
import Map from './components/Map'
import Header from './components/Header'


// import { Header } from './components/Header'
import './App.css'
import {BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();


  const logout = () => {

    // Make cookie expire 
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + 1000*36000;
    now.setTime(expireTime);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setUserId('');
    setUser('');
    setLoggedIn(false);

}

  const isLoggedIn = (token) => {


    const axios = require('axios');

    if (token != null) {
        axios.get(`http://localhost:3306/login/loginWithToken?token=${token}`).
        then((response) => {
            // localStorage.setItem("token", token);
            setLoggedIn(true);
            setUserId(response['data']['result'][0]['user_id']);
            setUser(response['data']['result'][0]['username']);


        }).catch((err) => {
            setLoggedIn(false);


        })

    }
}

  useEffect(() => {

    let token = getToken();

    if (token != 'fail') {

      isLoggedIn(token);

    }
  }, [])


  return (
    <>

    <div class="App">
    <Router>

      <Route path="/profile" exact render={() => { return ( 
          <Profile loggedIn={loggedIn} 
          logout={() => logout()}
          user={user}
          userId={userId}
          /> )}}/>
      
      <Map loggedIn={loggedIn}/>
      <Route path="/" exact render={() => { return ( <Map loggedIn={loggedIn}/> )} }/>
      <Route path="/welcome" exact render={() => { return ( <WelcomeModal loggedIn={loggedIn}/> )} }/>
      <Route path="/login" exact render={() => { return ( <LoginModal loggedIn={loggedIn} /> )} }/>
      <Route path="/signup" exact render={() => { return ( <SignUpModal loggedIn={loggedIn}/> )} }/>
   </Router>

   </div> 

   </>
   
  )
}

export default React.memo(App)