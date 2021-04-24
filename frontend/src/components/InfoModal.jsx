import react, {useState, useEffect} from 'react'
import FullPopup from "reactjs-popup"


import 'bootstrap/dist/css/bootstrap.min.css';
import "./card-style.css";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import CancelIcon from '@material-ui/icons/Cancel';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import CustomizedRatings from './CustomizedRatings'



export default function InfoModal({latitude, longitude, event_name,time_of_event,event_description,setSelected}){
    const [adjustedTimeString, setAdjustedTimeString] = useState("")

    useEffect(() => {
        let time = new Date(time_of_event).toLocaleTimeString('en-US');
        console.log(time)
      }, []);
    
    
    const joinOnClick = () =>{
        alert("Join")
        setSelected(null)
    }

    
    return(
    <div>
        <div className="card-body text-dark">
            <h4 className="card-title">{event_name}</h4>
            <p className="description"> {event_description}</p>
            <p className="card-text text-secondary"> {time_of_event}</p>
            <CustomizedRatings></CustomizedRatings>
        </div>
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
    </div>
  );
}
