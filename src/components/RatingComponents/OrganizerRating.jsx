import React,{useState,useEffect} from 'react';
import axios from 'axios'
import Rating from 'material-ui-rating'
import StarRatingComponent from 'react-star-rating-controlled-component';


export default function OrganizerRating({organizer_id}) {
  const [ratings, setRatings] = useState(0)
  //const [ratings, setRatings] = useState(0)
  useEffect(()=>{
    axios.get(`http://localhost:3306/event/getUserRating?user_id=${organizer_id}`)
        .then((response) => {
          console.log("organizer rating",response.data[0]["User Average"])
          
          setRatings(response.data[0].User_Averge)
          //setOrganizer_name(response.data[0].User)
          

        }).catch((err) => {
          alert(err);
          console.log(err)
         })

    
  },[])

  return (
    <div>
      <StarRatingComponent 
          name="rate1" 
          //starCount={0}
          value={ratings}
          //onStarClick={this.onStarClick.bind(this)}
        />
    </div>
  );

}
