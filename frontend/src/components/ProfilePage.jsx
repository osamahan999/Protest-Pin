import React, { useState, useEffect } from 'react';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import Header from './Header'
import './ProfilePage.css'
import {BrowserRouter as Router, Link} from 'react-router-dom';



// class ProfilePage extends React.Component {
//     render() {
//         return (
//             <>
//             {/* { console.log(localStorage.getItem("loggedIn"))} */}
//             { localStorage.getItem("loggedIn") ? 
//             <div class="page">
//             <Header />
//             <Profile /> 
            
//             </div>
//             : null} 

//             </>

//         );
//     }

// }


export default function Profile(props) {
    const [rating, setRating] = useState();
    const [bio, setBio] = useState();
    const [total, setTotal] = useState();
    const [activityLoaded, setActivityLoaded] = useState(true);
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [eventsLoaded, setEventsLoaded] = useState(false);
    const [events, setEvents] = useState({});


    const [eventIds, setEventIds] = useState([]);    
    const populateActivity = (data) => {
        setEvents(data);
    }

    useEffect(() => {
        setProfile();
        getEvents();

    }, []);




    async function getEvents () {
    var axios = require('axios');
    var event = [];
    var activity = [];


    await axios.get(`http://localhost:3306/profile/activity?userId=${localStorage.getItem("userId")}`)
    .then( response => {
        var data = response.data.message;

        for (var i = 0; i < Object.keys(data).length; i++) {
            event.push(data[i]["event_id"]); 
            // populateEvents(eventIds);
        }

        setEventIds(event);
        console.log("event ids set" + event);
        setEventsLoaded(true);
        getActivity();

    })
    .catch( error => {
    console.log(error);
    });


    
    }


    async function setProfile() {
        var axios = require('axios');

        await axios.get(`http://localhost:3306/profile/profile?userId=${localStorage.getItem("userId")}`)
        .then((response) => {
            var data_rating = response['data']['result'][0]['avg_rating'];
            var data_bio = response['data']['result'][0]['bio'];
            var data_total = response['data']['result'][0]['total_reviews'];
            
            setRating(data_rating);
            setBio(data_bio);
            setTotal(data_total);
            console.log("profile set");
            setProfileLoaded(true);

        })
        .catch((error) => {
            console.log(error);
        });

    }




    async function getActivity() {
        var axios = require('axios');
        var activity = [];
        var i =0;

        for (i = 0; i < eventIds.length; i++) {
            axios.get(`http://localhost:3306/event/getSpecificEvent?event_id=${eventIds[i]}`)
            .then(function (response) {
            // var data = response.data; 
            var name = response.data.event.event_name;
            var date = response.data.event.time_of_event;



            activity.push({
                eventName: name,
                eventDate: date
            });

            
                populateActivity(activity);
                setActivityLoaded(true);

                        

            })
            .catch(function (error) {
            console.log(error);
            }); 
        }


    }


    const showRating = () => {
        let starList = [];


        for (var i = 0; i < Math.round(rating); ++i) {
            starList.push(<span class="fa fa-star checked"></span>)
        } 
        for (var i = 0; i < Math.round(5-rating); ++i) {
            starList.push(<span class="fa fa-star unchecked"></span>)
        }

        return starList;

    }





    return (
        <>

        {activityLoaded ?
        <>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

        <Header />

        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-info">
                    <h>{localStorage.getItem("username")}</h>
                    <p id="review">      


                    {showRating()} <i>{ total }</i></p>
                    <p id="bio">{bio}</p>
                </div>


                <Link to="/welcome"><button class="logout" onClick={ () => props.logout()}>Logout</button></Link>
            </div>
            <hr></hr>
        
            
            <div className="activity">


                {/* <div className="act">
                    <p>Attended a EventName organized by Organizer</p> 
                    <br /><p id="event-description">Event description</p>
                </div>
                <p>DateTime</p> */}

                {/* {Object.values(events).map((event, index) => (
                    <div>heyyyy</div>
                    // console.log(events[event])
                ))} */}

              {console.log(events[0])}

                
            </div>

        </div>

        </>


        : 

        <div class="profile-page">
            <div class="loader"></div></div>}
        </>

       
    )

}