import React, { useState } from 'react';
import { LoginModal } from './LoginModal'
import { SignUpModal } from './SignUpModal'
import { WelcomeModal } from './WelcomeModal'
import './ModalContainer.css';
import Map from './Map'

import {BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'



export function ModalContainer () {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         welcome: true,
    //         login: false,
    //         signup: false
    //     };

    // }

    // // Toggle between modals
    // openLogin = () => { this.setState({ welcome: false, login: true, signup: false}) };
    // openSignUp = () => { this.setState({ welcome: false, login: false, signup: true}) };
    // closeModals = () => {this.setState({ welcome: false, login: false, signup: false})};


    // render() {
    //     return (
    //         <>
            
    //         <Map />

    //             {this.state.welcome ? (
                    
    //             </div>

                
            
    //             ) : null}

    //             {this.state.login? (
    //                 <LoginModal />
    //             ) : null}

    //             {this.state.signup? (
    //                 <SignUpModal />
    //             ): null}

    //             </>

    //     );

    // }

    return ( 
    <Router>
        <Route path="/login" exact render={
            () => {
                return ( <LoginModal /> )
            }

        }/>


    </Router>

    );




}



