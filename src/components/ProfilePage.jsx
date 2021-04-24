import React, { useState, useEffect } from 'react';
import { MainPage } from './MainPage'
import './ProfilePage.css'


export class ProfilePage extends React.Component {

    render() {


        return (
            <>


            <MainPage />

            <Profile /> 
            </>



        );
    }

}

function Profile() {
    const [rating, setRating] = useState();
    const [bio, setBio] = useState();
    const [total, setTotal] = useState();


    useEffect(() => {
        setProfile();
    }, [])


    const setProfile = () => {
        var axios = require('axios');


        axios.get(`http://localhost:3306/profile/profile?userId=${localStorage.getItem("user_id")}`)
        .then((response) => {
            var data_rating = response['data']['result'][0]['avg_rating'];
            var data_bio = response['data']['result'][0]['bio'];
            var data_total = response['data']['result'][0]['total_reviews'];
            
            setRating(data_rating);
            setBio(data_bio);
            setTotal(data_total);
        })
        .catch((error) => {
            console.log(error);
        });

    }


    const showRating = () => {
        let starList = []
        console.log(rating);
        // for (var i = 0; i < ; i++) {
        //     starList.push(<span class="fa fa-star checked"></span>)
        // }

        return starList;
    }

    return (
        <>


        <MainPage />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <div className="profile-page">

        <div className="profile-header">
            <h>{localStorage.getItem("username")}</h>
            <p id="review">      


            {showRating()}

            

            <i>{ total }</i></p>
            <p id="bio">Bio</p>
            </div>
            <hr></hr>
            
            
            <div className="activity">

                <div className="act">
                    <p>Username attended a protest</p>
                </div>
        
                <div className="act">
                    <p>Username attended a protest</p>
                </div>
                <div className="act">
                    <p>Username attended a protest</p>
                </div>
                <div className="act">
                    <p>Username attended a protest</p>
                </div>

                <div className="act">
                    <p>Username attended a protest</p>
                </div>
                <div className="act">
                    <p>Username attended a protest</p>
                </div>
                <div className="act">
                    <p>Username attended a protest</p>
                </div>

                <div className="act">
                    <p>Username attended a protest</p>
                </div>
                <div className="act">
                    <p>Username attended a protest</p>
                </div>
                <div className="act">
                    <p>Username attended a protest</p>
                </div>
                <div className="act">
                    <p>Username attended a protest</p>
                </div>
                <div className="act">
                    <p>Username attended a protest</p>
                </div>



                
            </div>

        </div>
        </>
    )

}