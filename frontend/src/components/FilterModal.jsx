import axios from 'axios';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
//import 'reactjs-popup/dist/index.css';
import './FilterModal.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
 
export default function FilterModal({setEventList}){ 
    const [input_name,setInput_name] = useState("")
    const [input_description, setInputDescription] = useState("")


    const onFormSubmit = (event) =>{
        event.preventDefault()
        axios.get(`http://localhost:3306/event/getEventsByFilter?input_name=${input_name}`)
        .then((response) => {
    
        console.log("fitering",response.data.events)
        if(response.data.events.length <= 0){
            alert("No event is found.")
            
        }else{
            alert("Event(s) found!")
            setEventList(response.data.events)
            
        }
        //setInput_name(" ")
        //setInputDescription(" ")
        
      //do the login shit here
    }).catch((err) => {
      alert("Something wrong in filtering")
    })
    setInput_name("")
    
    }


    const onNameChange = (event) =>{
        
        console.log(event.target.value)
        setInput_name(event.target.value)
    }

    const onDescriptionChange = (event) =>{
        setInputDescription(event.target.value)
    }

    
        return(
            <Popup
            trigger={<Button style={{backgroundColor:"rgb(252, 217, 215)"}} variant="outlined" color="default"> Filter Events </Button>}
            modal
            nested
          >
            {close => (
              <div className="modal">
              
                <div className="header"> Fiter Events </div>
                <div className="content">
                    <form onSubmit={onFormSubmit}>
                        <div>
                            
                            <TextField
                            value={input_name} 
                            
                            // id="filled-full-width"
                            label="Key words of the event title"
                            style={{ margin: 5 , width: "300px"}}
                            placeholder="BLM"
                            margin="normal"
                            onChange={onNameChange}
                           
                            variant="outlined"
                            ></TextField>   
                        </div>
                        <br/>

                    
                        
            
                        <button className="button"> Submit </button>

                        <button
                            className="button"
                            onClick={() => {
                            console.log('modal closed ');
                            close();
                            }}
                        >
                            Close
                        </button>
                    </form>
                </div>        
              </div>
            )}
          </Popup>
        )
    
  
};