import React,{useState,useEffect} from 'react';
import axios from 'axios'
import Rating from 'material-ui-rating'
import StarRatingComponent from 'react-star-rating-controlled-component';


export default function OrganizerRating({event_rating=0}) {
  //const [ratings, setRatings] = useState(0)
  //const [ratings, setRatings] = useState(0)
  

  return (
    <div>
      <StarRatingComponent 
          name="rate1" 
          //starCount={0}
          value={event_rating}
          //onStarClick={this.onStarClick.bind(this)}
        />
    </div>
  );

}
