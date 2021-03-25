import React, { useState } from 'react';
import { LoginModal } from './LoginModal'
import { SignUpModal } from './SignUpModal'
import './ModalContainer.css';
import Map from './Map'

export class ModalContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            welcome: true,
            login: false,
            signup: false
        };

    }

    // Toggle between modals
    openLogin = () => { this.setState({ welcome: false, login: true, signup: false}) };
    openSignUp = () => { this.setState({ welcome: false, login: false, signup: true}) };
    closeModals = () => {this.setState({ welcome: false, login: false, signup: false})};

    

    render() {
        return (
            <>
            
            <Map />

                {this.state.welcome ? (
                    <div className='overlay'>
                    <div className='modal'>
                    <img src="pexels-markus-spiske-protest.jpg" ></img>
                    <header id="modal-header">Welcome to Protest Pin</header>
                    <p id="desc">To get started, login or sign up.</p>
                    <button onClick={this.openLogin}>Login</button>
                    <button onClick={this.openSignUp}>Sign Up</button>
                    </div>
                    
                </div>

                
            
                ) : null}

                {this.state.login? (
                    <LoginModal />
                ) : null}

                {this.state.signup? (
                    <SignUpModal />
                ): null}

                </>

        );

    }





}

