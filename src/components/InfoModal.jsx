import react, {useState, useEffect} from 'react'
import FullPopup from "reactjs-popup"
import axios from 'axios'


// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./card-style.css";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import CancelIcon from '@material-ui/icons/Cancel';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UserRating from './RatingComponents/UserRating'
import StarRatings from './RatingComponents/OrganizerRating'
import { set } from 'date-fns/esm';




export default function InfoModal({user_votes,position,isAttending,user_id,event_id,organizer_id, event_name,time_of_event,event_description,setSelected,getEventList}){
    
    const [googleUrl, setGoogleUrl]  = useState("")
    const [currentDateTime, setCurrentDateTime] = useState(new Date())
    const [isPastEvent, setIsPastEvent] = useState(false)
    const [isJoined, setIsJoined] = useState(false)
    const [organizer_ratings, setOrganizerRatings] = useState(0)
    const [organizer_name, setOrganizer_name]= useState("")
    const [numberOfAttendees, setNumberOfAttendees] = useState(0)

    useEffect(() => {
        setIsJoined(isAttending)
        let time = new Date(time_of_event)  
        if(time < new Date()){
            setIsPastEvent(true)
        }
        setCurrentDateTime(time)
        //console.log(time.toString())
    
        axios.get(`http://localhost:3306/event/getUserRating?user_id=${organizer_id}`)
        .then((response) => {
          console.log("organizer rating",response.data[0])
          setOrganizerRatings(response.data[0].User_Averge)
          setOrganizer_name(response.data[0].User)
        }).catch((err) => {
          alert(err);
          console.log(err)
         })

         axios.get(`http://localhost:3306/event/getEventAttendees?event_id=${event_id}`)
        .then((response) => {
          //console.log("number of",response.data)
          setNumberOfAttendees(response.data[0].Attendees)
        }).catch((err) => {
          alert(err);
          console.log(err)
         })

        const url = `https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`
        setGoogleUrl(url)
        
      }, []);
    
    
    const joinOnClick = () =>{
        console.log(event_id)
        axios.post("http://localhost:3306/event/joinEvent", {
            "user_id": user_id,
            "event_id" : event_id
           
             }).then((response) => {
              console.log(response.data)
              setIsJoined(true)
              alert("You have successfully joined the event!")
              getEventList()
              //setNewMarkerLocation(null)
              //do the login shit here
    
            }).catch((err) => {
              alert(err);
              console.log(err)
             })
        
        
        setSelected(null)
    }


    const leaveOnClick = () =>{
        console.log(event_id)
        axios.post("http://localhost:3306/event/leaveEvent", {
            "user_id": user_id,
            "event_id" : event_id
           
             }).then((response) => {
              console.log(response.data)
              setIsJoined(false)
              getEventList()
              alert("You have successfully joined the event!")
              //setNewMarkerLocation(null)
              //do the login shit here
    
            }).catch((err) => {
              alert(err);
              console.log(err)
             })
        
        
        setSelected(null)
    }


    const deleteOnClick = () =>{
    
        axios.post("http://localhost:3306/event/deleteEvent", {
        "user_id": user_id,
        "event_id":event_id
      }).then((response) => {
          console.log(response)
          alert("Protest is deleted successfully!")
          console.log("calling getEventList")
          getEventList()
          setSelected(null)
          //setNewMarkerLocation(null)
          //do the login shit here

      }).catch((err) => {
          alert(err);
          console.log(err)
      })


    }

    
    return(
    <div>
        <div className="card-body text-dark">
            <h2 className="card-title">{event_name}</h2>    
            <h5>Orgainizer:  {organizer_name}  </h5>
            <br/>
            
            <StarRatings organizer_id={organizer_id}></StarRatings>
        
            <br/>
            <h4 className="description"> {event_description}</h4>
            <br/>
            <h5 className="card-text text-secondary"> {currentDateTime.toString()}</h5>
            <br/>
            <h5>Number of attendee: {numberOfAttendees}</h5>
            <br/>
            <a href={googleUrl} target="_blank" rel="noopener noreferrer"> Show me on Google Maps</a>
            <br/>
            <br/>
            {isPastEvent&&isAttending? (
                
                <UserRating user_id={user_id} event_id={event_id} organizer_id={organizer_id}  curRatings={user_votes} isStars={false} getEventList={getEventList}></UserRating>
            ) : (null)}
           
        </div>
        <br/>
        {organizer_id !== user_id?(
             <ButtonGroup
             fullWidth={true}
         >
             <Button
             startIcon={<CancelIcon/>}
             size="large"
             variant="contained"
             color = "primary"
             onClick={()=>setSelected(null)}
             >
             Back
             </Button>
             {isJoined? (             <Button
             startIcon={<DirectionsRunIcon/>}
             size="large"
             variant="contained"
             color = "secondary"
             onClick={()=>leaveOnClick()}
             >
             Leave
             </Button>): (
                <Button
                startIcon={<DirectionsRunIcon/>}
                size="large"
                variant="contained"
                color = "secondary"
                onClick={()=>joinOnClick()}
                >
                Join
                </Button>
             )}

         </ButtonGroup>
        ):(
            <ButtonGroup
            fullWidth={true}
        >
            <Button
            startIcon={<CancelIcon/>}
            size="large"
            variant="contained"
            color = "primary"
            onClick={()=>setSelected(null)}
            >
            Back
            </Button>
            <Button
            startIcon={<DeleteForeverIcon/>}
            size="large"
            variant="contained"
            color = "secondary"
            onClick={()=>deleteOnClick()}
            >
            Delete this event
            </Button>
        </ButtonGroup>
        )
        }
       
    </div>
  );
}
