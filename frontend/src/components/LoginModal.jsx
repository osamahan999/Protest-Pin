import React, { Component } from 'react';
import './ModalContainer.css';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Map from './Map';
import { useHistory } from "react-router-dom";
//import { HomePage } from './HomePage.jsx'
import { Redirect } from "react-router-dom";
import axios from 'axios'
// import { isLoggedIn } from "../helper"
import { withRouter } from 'react-router-dom'




export class LoginModal extends Component {
    constructor(props) {
        super(props)
        this.props = props;
        // const history = this.props;
        this.state={
            username: "",
            password: "",
            redirect: false,
            validated: true,
            loggedIn: false
    
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
        .then( response => {
            // Sets the cookie to the token
            if (response.data.token != null) {
                let now = new Date();
                now.setTime(now.getTime() + (1000 * 3600000)); //lasts 3.6 million seconds

                let cookie = "token = " + response.data.token + "; SameSite=None; Secure; expires=" + now.toUTCString();
                document.cookie = cookie;

            }
            this.setState({validated: true});
            window.location.assign("http://localhost:3000/");

        })
        .catch(error => {
            //TODO: error message pop up
            // document.getElementById("modal").style.filter = "drop-shadow(0 0 .75rem red)";
            console.log(error);
            this.setState({validated: false});
        })


    }


    render() {
        return (
            <>

        {/* <Router>
            <Route path="/" exact component={Map}/>
        </Router> */}

            {/* { !localStorage.getItem("loggedIn") && */}
            
                <>
                {/* <Route path="/" exact render={ 
                () => {
                    return ( <Map /> )
                }

                }/> */}
                <div className="overlay">
                <div id="modal" className="modal" >
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

                    <br />
                    <button type="submit">Log in</button>
                    { !this.state.validated ? <p id="wrong-login">Wrong username or password</p> :null }
                    </form>


                    <p id="desc">Don't have an account? <br />
                    <Link to="/signup"><button id="nav">Create one</button></Link></p>


                </div>
                </div>
                </>

            
            
       {/* } */}

                
            </>

        )
    }

}

export default withRouter(LoginModal)