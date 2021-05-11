import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DateTimePicker({setVisitDate}) {
    const classes = useStyles();
    const [dateObj,setDateObj] = useState() 
    const [value, setValue] = useState("2021-05-11T10:30")

    const onChange = (e) =>{
      if(new Date(e.target.value) < new Date()){
        alert("Cannot pick a day is already passed!")
        return
      }else{
        setValue(e.target.data)
        setVisitDate(e.target.value)
      }
        
    }
  

  return (
    <div>
      <TextField
        style={{width:"28vw"}}
        id="datetime-local"
        label="Date and Time of the event"
        type="datetime-local"
        value={value}
        onChange = {e=>onChange(e)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
    
  );
}
