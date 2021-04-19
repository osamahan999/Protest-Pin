import React, { useState } from 'react';
import Map from './Map'
import './MainPage.css'
import { Redirect } from "react-router-dom";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';



export class MainPage extends React.Component {


    render() {
        return (
            <>

                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            
            
                        <div className="map"><Map /></div>

            <div className="header-bar">
                <h>PROTEST PIN</h>    

                <div className="icons">

                <Link to="/"><button><i class="material-icons">home</i></button></Link>
                <button><i class="material-icons">search</i></button>
                <Link to="/profile"><button><i class="material-icons">person</i></button></Link>

                </div> 


            </div>




            </>





        );
    }

}