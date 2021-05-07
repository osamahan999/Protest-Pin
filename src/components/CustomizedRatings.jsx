import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import axios from 'axios'

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function CustomizedRatings({user_id, event_id,event_ratings=0, isStars}) {
  const [ratings, setRatings] = useState(event_ratings)

  useEffect(()=>{
    console.log(user_id,event_id)
    setRatings(event_ratings)
  },[ratings])


  const ratingsOnChange = (newValue) =>{
    console.log(newValue)
    axios.post("http://localhost:3306/event/voteOnEvent", {
        "user_id": user_id,
        "event_id":event_id,
        "votes":newValue
       
         }).then((response) => {
          console.log(response.data)
          alert("Thank you for your vote")
          //setNewMarkerLocation(null)
          //do the login shit here

        }).catch((err) => {
          alert(err);
          console.log(err)
         })


  }
  return (
    <div>
      {isStars?(<Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Organizer Ratings</Typography>
        <Rating
          //onChange={ratings()}
          disabled={true}
          name="customized-icons"
          defaultValue={event_ratings}
          getLabelText={(value) => customIcons[value].label}
          //IconContainerComponent={IconContainer}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Box>):(
      <Box component="fieldset" mb={3} borderColor="transparent">
      <Typography component="legend">Rate this event</Typography>
      <StyledRating
        name="customized-color"
        onChange={(event, newValue) => {
          ratingsOnChange(newValue);
        }}
        defaultValue={ratings}
        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
        precision={1}
        icon={<FavoriteIcon fontSize="inherit" />}
      />
    </Box>
      )}
      
    </div>
  );
}
