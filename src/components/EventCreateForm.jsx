import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import DateTimePicker from './DateTimePicker'
import {Container} from 'react-bootstrap'

import "react-datepicker/dist/react-datepicker.css";
import "./EventCreateForm.css";
import axios from "axios";


export default function EventCreateForm({lat,lng,setNewMarkerLocation,getEventList}){
    const inputRef = React.createRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {handleSubmit} = useForm();
    const [selectedDate, setSelectedDate] = useState(new Date()); 
    const [title,setTitle] = useState("");
    const [description, setDescription] = useState("");


    const setVisitDate =(date) =>{
        setSelectedDate(date);
        console.log(selectedDate);
        console.log(date)
    }

    
  const onSubmit = async() => {
    try {
      setLoading(true);
      let event={};
     
     
      event.latitude = lat;
      event.longitude = lng;
      event.event_name = title;
      event.time_of_event = selectedDate;
      event.event_description = description;

      console.log(event)

      axios.post("http://localhost:3306/event/createEvent", {
        "user_id": 98,
        "event_name": title,
        "event_description": description,
        "time_of_event": selectedDate,
        "latitude": lat,
        "longitude": lng,
      }).then((response) => {
          console.log(response)
          alert("Protest is created successfully!")
          getEventList()
          setNewMarkerLocation(null)
          //do the login shit here

      }).catch((err) => {
          alert(err);
      })

      //axios call here: create event


      //await createLogEntry(data);
      //alert("Entry Created")
      //onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };


    return(
      
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form" >
      {error ? <h3 className="error">{error}</h3> : null}
     
     <div className="textfield">
      <TextField
            style={{marginBottom:"10px"}}
            required
            className="textfield"
            name="title"
            id="outlined-required"
            label="Required Title"
            placeholder="Title"
            //variant="outlined"
            onChange ={e=>setTitle(e.target.value)}
            ref = {inputRef}
        />

         <TextField
         style={{marginTop:"20px"}}
          name="description"
          label="Description"
          required
          placeholder="This place....."
          className="textfield"
          multiline
          onChange ={e=>setDescription(e.target.value)}
         
          ref={inputRef}
        />
       
     </div>
      

      <div className="textfield-div">
        <DateTimePicker
            
            setVisitDate={setVisitDate}>
            
          </DateTimePicker>
      </div>
        
      <button 
      className="button"
      disabled={loading}
      >
        {loading ? "Loading..." : "Create Entry"}
      </button>
    

    </form>
   
    
        
    )
}