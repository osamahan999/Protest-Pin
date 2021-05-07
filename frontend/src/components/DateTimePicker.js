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

    const onChange = (e) =>{
       
        setVisitDate(e.target.value)

    }
  

  return (
    <div>
      <TextField
        style={{width:"50%"}}
        id="datetime-local"
        label="Date and Time of the event"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        onChange = {e=>onChange(e)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
    
  );
}
