import react, {useState, useEffect} from 'react'
import FullPopup from "reactjs-popup"


// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./card-style.css";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import CancelIcon from '@material-ui/icons/Cancel';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CustomizedRatings from './CustomizedRatings'



export default function InfoModal({user_id,event_id,organizer_id, event_name,time_of_event,event_description,setSelected,getEventList}){
    const [adjustedTimeString, setAdjustedTimeString] = useState("")
    //const [userId, setUserId] = useState(98);

    useEffect(() => {
        //setUserId(localStorage.getItem("userId"))
        let time = new Date(time_of_event).toLocaleTimeString('en-US');
        console.log(time)
        console.log("event id",event_id)
        console.log("organizer id", organizer_id)
        console.log("user id:",user_id)
      }, []);
    
    
    const joinOnClick = () =>{
        console.log(event_id)
        
        setSelected(null)
    }

    const deleteOnClick = () =>{
        alert("delete")

    }

    
    return(
    <div>
        <div className="card-body text-dark">
            <h4 className="card-title">{event_name}</h4>
            <br/>
            <p className="description"> {event_description}</p>
            <br/>
            <p className="card-text text-secondary"> {time_of_event}</p>
            <br/>
            <CustomizedRatings curRatings={0} isStars={false}></CustomizedRatings>
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
             <Button
             startIcon={<DirectionsRunIcon/>}
             size="large"
             variant="contained"
             color = "secondary"
             onClick={()=>joinOnClick()}
             >
             Join
             </Button>
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
