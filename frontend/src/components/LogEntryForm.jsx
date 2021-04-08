import React, { useState } from "react";
import { useForm } from "react-hook-form";
//import { createLogEntry,uploadImgae } from "../API";



//import { FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import DatePicker from "react-datepicker";
//import ImageUploader from 'react-images-upload';
import {Container} from 'react-bootstrap'

import "react-datepicker/dist/react-datepicker.css";
import "./entryForm-style.css";


import 'date-fns';




export default function LogEntryForm ({ location, onClose }) {
  const inputRef = React.createRef(null);
  const [loading, setLoading] = useState(false);
  //const [pictures, setPictures] = useState([]);

  const [error, setError] = useState("");
  const {handleSubmit} = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [event_name,set_event_name] = useState("");
  const [event_description, set_event_description] = useState("");
  



  const onDrop = picture => {
    setPictures(picture);
    console.log(picture)
  };


  const set_event_date =(date) =>{
    setSelectedDate(date);
    console.log(selectedDate);
    console.log(date)
}
  

  const onSubmit = async() => {
    console.log("submit clicked")
    try {
      setLoading(true);
      let data={};
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      data.event_name = event_name;
      data.time_of_event = selectedDate;
      data.event_description = description;
      console.log("data",data)
      //await createLogEntry(data);
      //alert("Entry Created")
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };


  return (
    
    <div className="form-div">
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form" >
      {error ? <h3 className="error">{error}</h3> : null}
     <Container>
      <TextField
          required
          className="textfield"
          name="event_name"
          id="outlined-required"
          label="Required Title"
          placeholder="Event Name"
          //variant="outlined"
          onChange ={e=>set_event_name(e.target.value)}
          ref = {inputRef}
        />
     </Container>

     
      
      <Container>
      <TextField
          name="event_description"
          label="event_description"
          placeholder="Event Description"
          className="textfield"
          multiline
          onChange ={e=>set_event_description(e.target.value)}
         
          ref={inputRef}
        />
        </Container>

       

      <Container className ="date-picker-container">
      <label>Time of Event</label>
      <DatePicker
        className="date-picker"
        selected={selectedDate}
        onChange={date=>set_event_date(date)}
        dateFormat="MM/dd/yyyy"
        required
      />
      </Container>

      

     
     <button>
       Hi
     </button>

    </form>
    </div>
    
  );
};

//export default LogEntryForm;