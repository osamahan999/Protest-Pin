import React, { useState } from 'react';
import './ModalContainer.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Portal } from 'react-overlays';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Map from './Map';



export class SignUpModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: "",
            birthday: null,
            valid: false
        };

    }



    date = new Date();
    ageLimit = new Date(this.date.getFullYear() - 18, this.date.getMonth(), this.date.getDate());


      // Handle input changes
      handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({message: event.target.value}, this.handleRegistration);

        this.setState({
          [event.target.name]: isCheckbox
            ? event.target.checked
            : event.target.value
        });

    };

    // Handle registration changes
    handleRegistration = () => {
        
        var usernameLength, usernameChar, usernamePeriod, isUsername; 
        var passwordLength, passwordSpecial, passwordNumber, passwordMatch, isPassword;


        // Username requirements
        if (this.state.username.length < 5 || this.state.username.length > 30) usernameLength = false; 
        else usernameLength = true; 
        if (!/^[A-Za-z0-9 ._-]+$/.test(this.state.username.toString()) || /\s/.test(this.state.username.toString())) usernameChar = false
        else usernameChar = true;
        if (!/[.]{2,}/.test(this.state.username.toString()) && !this.state.username.toString().endsWith(".")) usernamePeriod = true; 
        else usernamePeriod = false;


        // Password requirements
        if (this.state.password.length < 5 || this.state.password.length > 30) passwordLength = false; 
        else passwordLength = true;
        if (/[!@#$%\^&*()\?]/.test(this.state.password.toString())) passwordSpecial = true;
        else passwordSpecial = false;
        if (/[0-9]/.test(this.state.password.toString())) passwordNumber = true;
        else passwordNumber = false; 


        // Check username requirements
        if (!usernameLength || !usernameChar || !usernamePeriod) {
            document.getElementById("user-info").style.color = "red"
            document.getElementById("username-field").style.border = "1px solid red";
        }
        if (!usernameLength) document.getElementById("un-req-1").style.color = "red";
        if (!usernameChar) document.getElementById("un-req-2").style.color = "red";
        if (!usernamePeriod) document.getElementById("un-req-3").style.color = "red";

        if (usernameLength) document.getElementById("un-req-1").style.color = "#c6c6c6";
        if (usernameChar) document.getElementById("un-req-2").style.color = "#c6c6c6";
        if (usernamePeriod) document.getElementById("un-req-3").style.color = "#c6c6c6";
        if (usernameLength && usernameChar && usernamePeriod) {
            document.getElementById("user-info").style.color = "black";
            document.getElementById("username-field").style.border = "1px solid black";

            isUsername = true;
        } else isUsername = false;

        // Check password requirements
        if (!passwordLength|| !passwordNumber || !passwordSpecial) {
            document.getElementById("pw-info").style.color = "red";
            document.getElementById("pw-field").style.border = "1px solid red";

        }
        if (!passwordLength) document.getElementById("pw-req-1").style.color = "red";
        if (!passwordSpecial) document.getElementById("pw-req-3").style.color = "red";
        if (!passwordNumber) document.getElementById("pw-req-2").style.color = "red";
        if (passwordLength) document.getElementById("pw-req-1").style.color = "#c6c6c6";
        if (passwordSpecial) document.getElementById("pw-req-3").style.color = "#c6c6c6";
        if (passwordNumber) document.getElementById("pw-req-2").style.color = "#c6c6c6";
        if (passwordNumber && passwordLength && passwordSpecial) {
            document.getElementById("pw-info").style.color = "black";
            document.getElementById("pw-field").style.border = "1px solid black";

            isPassword = true;
        } else isPassword = false;



        //TODO: password alert 
        // Check passwords match
        if(this.state.password.toString().localeCompare(this.state.password2.toString()) !== 0 || !this.state.password2) {
            document.getElementById("pw2-field").style.border = "1px solid red";
            passwordMatch = true;
            console.log("Passwords do not match");
        } else {
            document.getElementById("pw2-field").style.border = "1px solid black";
            passwordMatch = false;
            console.log("Passwords match");
        }

        //Make sure all requirements are met
        if (isUsername && isPassword && passwordMatch) {
            this.setState({valid: true});
        } 

    }

    validate = event => {
        event.preventDefault();

        
        var month, day, birthdayString;
        var registrationSuccess;
        // Check fields are not empty 
        if(!this.state.username) document.getElementById("username-field").style.border = "1px solid red";
        else document.getElementById("username-field").style.border = "1px solid black";
        if(!this.state.password) document.getElementById("pw-field").style.border = "1px solid red";
        else document.getElementById("pw-field").style.border = "1px solid black";
        if(!this.state.password2) document.getElementById("pw2-field").style.border = "1px solid red";
        else document.getElementById("pw2-field").style.border = "1px solid black";
        if(!this.state.birthday) document.getElementById("bday-field").style.border = "1px solid red";
        else document.getElementById("bday-field").style.border = "1px solid black";


        
        if (this.state.valid) {
            if (this.state.birthday.getMonth() < 10) { month = "0".concat(this.state.birthday.getMonth() + 1).toString() }
            else { month = (this.state.birthday.getMonth() + 1).toString() }
            if (this.state.birthday.getDate() < 10) { day = "0".concat((this.state.birthday.getDate()+1).toString()) }
            else { day = (this.state.birthday.getDate()+1).toString() }
            birthdayString = this.state.birthday.getFullYear().toString().concat("-").concat(month).concat("-").concat(day);
    
    
            var axios = require('axios');
            var data = {"username":"","password":"","birthday":""};
            data["username"] = this.state.username; 
            data["password"] = this.state.password;
            data["birthday"] = birthdayString; 

            data = JSON.stringify(data);


            var config = {
            method: 'post',
            url: 'http://localhost:3306/register/userRegister',
            headers: { 'Content-Type': 'application/json'},
            data : data };

            // TODO: route to main page? 
            //       success pop up
            axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));

            })
            .catch((error) => {
                // TODO: error popup
                console.log(error);
            });


        }



    };


    CalendarContainer = ({ children }) => {
        const el = document.getElementById("calendar-portal");
    
        return <Portal container={el}>{children}</Portal>;
    };

    render() {
        return (
            <>


            <div className="overlay">
                    <div className="modal" id="modal">
                    {/* <body className="Reg-body"> */}
                               <header id="modal-header">Register your account</header>
                               <form onSubmit={this.validate}>
            
                            <div className="form" id="form">
                            <div className="field">
                                <input
                                    id="username-field"
                                    type="text" 
                                    name="username" 
                                    value={this.state.name} 
                                    onChange={this.handleChange} 
                                    placeholder="Username"/>

            
                                <div className="info" id="user-info">ⓘ
                                    <div className="reqs" id="username-reqs">

                                    <p id="un-req-4">Username is taken</p>
                                    <p id="un-req-1">Must be between 5 and 30 characters</p>
                                    <p id="un-req-2">Only ".", "_", and "-" are allowed</p>
                                    <p id="un-req-3">Cannot end with "." or have multiple "." in a row</p>

                                    </div>
                                </div>
                            </div>
                           <br /><br />
                           
                           <div className="field">
                                <input 
                                    id="pw-field" 
                                    type="password" 
                                    name="password" 
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    placeholder="Password" />

            
                                <div className="info" id="pw-info">ⓘ
                                    <div className="reqs" id="pw-reqs">
                                    
                                    <p id="pw-req-1">Must be between 5 and 30 characters</p>
                                    <p id="pw-req-2">At least 1 number</p>
                                    <p id="pw-req-3">At least one special symbol "!", "@", "#", "$", "%", "^", "&", "*", "(", or ")"</p>
                                    </div>
                                </div>

                                <br /> <br />
                                <input 
                                    id="pw2-field"
                                    type="password"
                                    name="password2"
                                    value={this.state.password2}
                                    onChange={this.handleChange}
                                    placeholder="Enter password again"
                                />

                    
                            </div>

                            <br /><br />

                            <div className="field">                                
                                <DatePicker
                                    id="bday-field"
                                    className="date-picker"
                                    selected={this.state.birthday}
                                    onChange={date => this.setState({birthday: date})}
                                    dateFormat='MM-dd-yyyy'
                                    placeholderText='Birthday'
                                    popperPlacement="bottom"
                                    popperContainer={this.CalendarContainer}
                                    maxDate={this.ageLimit}
                                />
                                </div>
                           </div>
                           
                            
                           <button type="submit">Sign up</button>
                           </form>
                            {/* <div className="go-back"> */}
                           <p id="desc">Already have an account? <br />
                           <Link to="/login">
                           <button id="nav" onClick={this.openLogin}>Login here!</button>
                           </Link>
                           </p>
                           {/* </div> */}

                           {/* </body> */}
                    </div>
                    </div>
            </>

        )
    }

}