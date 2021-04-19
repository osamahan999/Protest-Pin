import React,{useState, useEffect} from 'react'
//import { ModalContainer } from './components/ModalContainer'
import { WelcomeModal } from './components/WelcomeModal'
import { LoginModal } from './components/LoginModal'
import { SignUpModal } from './components/SignUpModal'
import { ProfilePage } from './components/ProfilePage'
import Map from './components/Map'


import { MainPage } from './components/MainPage'
import './App.css'
import {BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'


function App() {


  useEffect(() => {

    let token = getToken();

    if (token != 'fail') {

      isLoggedIn(token);

    }
  }, [])


  const isLoggedIn = (token) => {


    const axios = require('axios');

    if (token != null) {
        axios.get(`http://localhost:3306/login/loginWithToken?token=${token}`).
        then((response) => {
            localStorage.setItem("user_id", response['data']['result'][0]['user_id']);
            localStorage.setItem("username", response['data']['result'][0]['username']);
            localStorage.setItem("isLoggedIn", true);

        }).catch((err) => {
            localStorage.setItem("user_id", "");
            localStorage.setItem("username", "");
            localStorage.setItem("isLoggedIn", false);

        })

    }
}

  /**
   * Returns the token from the cookies
   * or fail if no cookie with token
   */
  const getToken = () => {

    let cookies = document.cookie.split(';');
    let ret = '';

    if (cookies[0] != "") {
        cookies.forEach((keyPair) => {
            let subArray = keyPair.split('=');
            let key = subArray[0].trim();
            let value = subArray[1].trim();

            if (key == "token") ret = value;
        })
    } else return 'fail';

    return ret;
  }

  return (
    <>
    <Map />
    <Router>
   <div class="App">
     {localStorage.getItem("isLoggedIn") ? 
     <>
      <MainPage />

      </>
    :

    <>
      <WelcomeModal />
      <Route path="/welcome" exact render={ 
       () => {
         return ( <WelcomeModal /> )
       }
      }/>


<Route path="/profile" exact render={
            () => {
                return ( <ProfilePage /> )
            }

      }/>

      <Route path="/login" exact render={
            () => {
                return ( <LoginModal /> )
            }

      }/>


    <Route path="/signup" exact render={
                () => {
                    return ( <SignUpModal /> )
                }

          }/>

      </>
    
    }






      <Route path="/" exact render={
        () => {
          return ( <MainPage /> )
        }

      }/>
       
   </div> 

   </Router>

   </>
   
  )
}

export default React.memo(App)