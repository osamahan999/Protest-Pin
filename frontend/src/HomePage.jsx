import React, { useState } from 'react';
import { Portal } from 'react-overlays';
//import Modal from "react-responsive-modal";
import './HomePage.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const HomePage = () => {
    const [welcome, setWelcome] = useState(true);
    const [login, setLogin] = useState(false);
    const [signup, setSignUp] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const date = new Date();
    const ageLimit = new Date(date.getFullYear() - 18, date.getMonth(), date.getDate());
    const openLogin = () => {
        setWelcome(false);
        setLogin(true);
        setSignUp(false);
    };

    const openSignUp = () => {
        setWelcome(false);
        setLogin(false);
        setSignUp(true);
    };


    const CalendarContainer = ({ children }) => {
        const el = document.getElementById("calendar-portal");
    
        return <Portal container={el}>{children}</Portal>;
    };


        return (
            <>
                {/* Welcome modal */}
                {welcome ? (
                    <div class='overlay'>
                    <div class='modal'>
                    <img src="pexels-markus-spiske-protest.jpg" ></img>
                    <header id="modal-header">Welcome to Protest Pin</header>
                    <p id="desc">To get started, login or sign up.</p>
                    <button onClick={openLogin}>Login</button>
                    <button onClick={openSignUp}>Sign Up</button>
                    {/* <button onClick={this.onOpenSign}>Sign Up</button> */}
                    </div>
                    
                </div>

                
            
                ) : null}

                {login? (
                    <div class="overlay">
                    <div class="modal" >
                        <header id="modal-header">Member Login </header>
                        <p id="desc">Login to access your account!</p>
                        <form>
                        <div class="form" id="form">
                        <input type="text" name="username" placeholder="Username"/>
                        <br /><br /><input type="text" name="password" placeholder="Password" />
                        </div>

                        <br /><button >Log in</button>
                        </form>

                        <p id="desc">Don't have an account? <br /><button id="nav" onClick={openSignUp}>Create one</button></p>
    

                    </div>
                    </div>

                ) : null}

                {signup? (
                    <div class="overlay">
                    <div class="modal" id="modal">
                    <body className="Reg-body">
                               <header id="modal-header">  Register your account</header>
                               <form>
            
                            <div class="form" id="form">
                            <input type="text" name="username" placeholder="Username"/>
                           <br /><br /><input type="password" name="password" placeholder="Password"/>
                            <br /><br /><DatePicker 
                                selected={selectedDate}
                                onChange={date=>setSelectedDate(date)}
                                dateFormat='MM-dd-yyyy'
                                placeholderText='Birthday'
                                popperPlacement="bottom"
                                popperContainer={CalendarContainer}
                                maxDate={ageLimit}
                            />
                           </div>
                           
                            </form>
                           <button>Sign up</button>
                           <p id="desc">Already have an account? <br /><button id="nav" onClick={openLogin}>Login here!</button></p>

                           </body>
                    </div>
                    </div>
                ): null}
            </>

        );



};

