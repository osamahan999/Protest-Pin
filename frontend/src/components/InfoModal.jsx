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
import CustomizedRatings from './CustomizedRatings'




export default function InfoModal({total_stars, votes,position,user_id,event_id,organizer_id, event_name,time_of_event,event_description,setSelected,getEventList}){
    const [adjustedTimeString, setAdjustedTimeString] = useState("")
    const [googleUrl, setGoogleUrl]  = useState("")
    const [currentDateTime, setCurrentDateTime] = useState(new Date())
    const [updatedRatings, setUpdatedRatings]= useState(0)
    const [organizer_ratings, setOrganizer_ratings] = useState(0)
    const [isPastEvent, setIsPastEvent] = useState(false)
    const [isJoined, setIsJoined] = useState(false)
    //const [userId, setUserId] = useState(98);

    useEffect(() => {
        //setUserId(localStorage.getItem("userId"))
        console.log("total stars",total_stars)
        console.log("votes", votes)
        let time = new Date(time_of_event)

        if(time < new Date()){
            setIsPastEvent(true)
        }
        setCurrentDateTime(time)
        console.log(time.toString())
    
        axios.get("http://localhost:3306/event/getUserRating", {
        "user_id": user_id,
       
         }).then((response) => {
          console.log(response.data)
          //setNewMarkerLocation(null)
          //do the login shit here

        }).catch((err) => {
          alert(err);
          console.log(err)
         })

        const url = `https://www.google.com/maps/search/?api=1&query=${position.lat},${position.lng}`
        setGoogleUrl(url)
        console.log("event id",event_id)
        console.log("organizer id", organizer_id)
        console.log("user id:",user_id)
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
            <h4>Orgainizer:{organizer_id}  </h4>
            <CustomizedRatings curRatings={organizer_ratings} isStars={true}></CustomizedRatings>
            
            <br/>
            <h4 className="description"> {event_description}</h4>
            <br/>
            <h4 className="card-text text-secondary"> {currentDateTime.toString()}</h4>
            <br/>
            <a href={googleUrl} target="_blank" rel="noopener noreferrer"> Show me on Google Maps</a>
            <br/>
            <br/>
            {isPastEvent? (
                <CustomizedRatings user_id={user_id} event_id={event_id}  curRatings={0} isStars={false}></CustomizedRatings>
            ) : (null)}
           
        </div>
        {console.log("return:", user_id)}
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
