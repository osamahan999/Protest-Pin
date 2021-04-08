import React, { useState } from 'react';
import './ModalContainer.css';
import { HomePage } from './HomePage.jsx'
import { Redirect } from "react-router-dom";


const isLoggedIn = () => {
    let token = getToken();

    if (token != null) {

        axios.post("localhost:3306/login/loginWithToken", {
            token: token

        }).then((response) => {

            //do the login shit here

        }).catch((err) => {
            alert(err);
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


export class LoginModal extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            username: "",
            password: "",
            redirect: null
        }
    }

    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
          [event.target.name]: isCheckbox
            ? event.target.checked
            : event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
          console.log(this.state);
          this.setState({username: "", password: ""});
        }
      };

    validate = () => {

       var axios = require('axios');

        var config = {
        method: 'get',
        url: 'http://localhost:3306/login/loginUser?username=' + (this.state.username).toString() +'&password=' + (this.state.password).toString(),
        headers: { }
        };

        axios(config)
        .then(function (response) {
            //TODO: route to main page

            // Sets the cookie to the token
            if (response.data.token != null) {
                let now = new Date();
                now.setTime(now.getTime() + (1000 * 3600000)); //lasts 3.6 million seconds

                let cookie = "token = " + response.data.token + "; SameSite=None; Secure; expires=" + now.toUTCString();
                document.cookie = cookie;
            }
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            //TODO: error message pop up
            console.log(error);
        });


    }



    render() {

        return (
            <>

                <div className="overlay">
                    <div className="modal" >
                        <header id="modal-header">Member Login </header>
                        <p id="desc">Login to access your account!</p>
                        <form onSubmit={this.handleSubmit}>
                        <div className="form" id="form">
                        <input 
                            id="username-field"
                            type="text" 
                            name="username" 
                            value={this.state.name}
                            onChange={this.handleChange}
                            placeholder="Username"/>

                        <br /><br />
                        
                        <input 
                            id="password-field"
                            type="password" 
                            name="password" 
                            value={this.state.password}
                            onChange={this.handleChange}
                            placeholder="Password" />
                        </div>

                        <br /><button type="submit">Log in</button>
                        </form>

                        <p id="desc">Don't have an account? <br /><button id="nav" onClick={this.openSignUp}>Create one</button></p>
    

                    </div>
                </div>
            </>

        )
    }

}