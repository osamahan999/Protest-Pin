import React,{useState, useCallback,useRef, useEffect} from 'react'
import { GoogleMap, Marker,InfoWindow ,useLoadScript} from '@react-google-maps/api';
import axios from 'axios'

import {formatRelative} from 'date-fns' //to format the time 




import "@reach/combobox/styles.css"; 
import "./Map.css";
import mapStyles from './mapStyles' //map style
// ./map-components/LocateCompass
import SearchBar from './SearchBar'
import LocateCompass from './LocateCompass'
import EventCreateForm from './EventCreateForm'
import FilterModal from './FilterModal'
import InfoModal from './InfoModal'
import Header from './Header'
import "./Page.css"


const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 37.335480,
  lng: -121.893028,
};

const options ={
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl : true,
}
const libraries = ["places"];

export default function Map(props) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });
  const [newMarkerLocation, setNewMarkerLocation] = useState(null);
  const [markers, setMarkers] = useState([])
  const [selected,setSelected] = useState(null) //the marker was clicked by user
  const [modalShow, setModalShow] = useState(true);
  const [eventList, setEventList] = useState([])
  const [user_id, setUser_id] = useState()

  const mapRef = useRef()  //use ref to avoid react to rerender
  var headerBool = null;
  if (localStorage.getItem("loggedIn") == "true") headerBool = true;
  else headerBool = false;
  


  const getEventList = () => {  //call backend api for all the protest events 
    const userId = parseInt(localStorage.getItem("userId")) 
    console.log("user id:",userId)
    setUser_id(userId)
    axios.get(`http://localhost:3306/event/getUserEvents?user_id=${userId}`)
    .then((response) => {
    console.log("Get back from api",response.data)
    setEventList(response.data)
      //do the login shit here
  }).catch((err) => {
      alert(err);
  })
    
  };


  useEffect(() => {
    getEventList();
  }, []);


  const onMapLoad = useCallback( (map) => {
    mapRef.current = map;
  }, [] )




  const onMapClick =  useCallback( (event)=>{
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    }
    setSelected(null)
    setNewMarkerLocation(newLocation);
    
  }, [])

  const panTo = useCallback(({lat, lng}) =>{
    mapRef.current.panTo({lat, lng})
    mapRef.current.setZoom(15)
    const newLocation = {
      lat: lat,
      lng: lng,
      time: new Date(),
    }
    setNewMarkerLocation(newLocation)
  },[])

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div class="page">

    
    { headerBool && <>
      
      <SearchBar panTo = {panTo}/>
      <LocateCompass panTo = {panTo}/>
      
      
      
      <Header setEventList={setEventList}/>
     
      </>
    
    }

    

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={options}
          onClick={onMapClick}
          onLoad = {onMapLoad}
        >


    
          
        {eventList.map(event => 
         <Marker key={event.event_id} 
         position={{lat:event.latitude, lng: event.longitude}}
         icon={{
           url: `/loudspeaker.svg`,
           scaledSize: new window.google.maps.Size(30,30),
           origin: new window.google.maps.Point(0,0),
           anchor: new window.google.maps.Point(15,15),
          
         }}
         onClick = { ()=>{
           setSelected(event);
           //console.log("selected event data: ", event)
         } }
         >
         </Marker>)}



         

         {newMarkerLocation ? (<InfoWindow
         position = {{lat:newMarkerLocation.lat, lng:newMarkerLocation.lng}}
         onCloseClick = {()=>{  //after the user click the close btn, set the current selected location as null
           setNewMarkerLocation(null)
         }}
         >
           <div>
             <EventCreateForm lat={newMarkerLocation.lat} lng ={newMarkerLocation.lng} setNewMarkerLocation={setNewMarkerLocation} getEventList={getEventList} />
           </div>
         </InfoWindow>): null}



         {selected ? (<InfoWindow
          position={{lat:selected.latitude, lng: selected.longitude}}
         onCloseClick = {()=>{  //after the user click the close btn, set the current selected location as null
           setSelected(null)
         }}
         >
           <InfoModal
            user_votes = {selected.Votes}
            position={{lat:selected.latitude, lng: selected.longitude}}
            user_id = {parseInt(localStorage.getItem("userId"))}
            isAttending = {user_id===selected.user_id?(true):(false)}
            event_id = {selected.event_id}
            organizer_id={selected.organizer_id}
            event_name = {selected.event_name}
            time_of_event = {selected.time_of_event}
            event_description = {selected.event_description}
            setSelected={setSelected}
            getEventList={getEventList}
            //onHide = {() => setModalShow(false)}
            //setSelected = {setSelected}
           />           
         </InfoWindow>): null}
         
        
        </GoogleMap>
      
    </div>
  )


}


