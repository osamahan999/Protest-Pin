import React,{useState, useCallback,useRef} from 'react'
import { GoogleMap, Marker,InfoWindow ,useLoadScript} from '@react-google-maps/api';
import {formatRelative} from 'date-fns' //to format the time 




import "@reach/combobox/styles.css"; 
import "./Map.css";
import mapStyles from '../mapStyles' //map style

import SearchBar from './SearchBar'
import LocateCompass from './LocateCompass'
import EventCreateForm from './EventCreateForm'



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

export default function Map() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });
  const [newMarkerLocation, setNewMarkerLocation] = useState(null);
  const [markers, setMarkers] = useState([])
  const [selected,setSelected] = useState(null) //the marker was clicked by user
  const [selectedCenter, setSelectedCenter] = useState(null);

  const mapRef = useRef()  //use ref to avoid react to rerender
  

  const onMapLoad = useCallback( (map) => {
    mapRef.current = map;
  }, [] )

  const onMapClick =  useCallback( (event)=>{

    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    }
    setMarkers(current => [...current,newLocation])
    setNewMarkerLocation(newLocation);
    
  }, [])

  const panTo = useCallback(({lat, lng}) =>{
    mapRef.current.panTo({lat, lng})
    mapRef.current.setZoom(12)
  },[])

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <SearchBar panTo = {panTo}/>
      <LocateCompass panTo = {panTo}/>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={options}
          onClick={onMapClick}
          onLoad = {onMapLoad}
        >

        
         {markers.map(marker => 
         <Marker key={marker.time.toISOString()} 
         position={{lat:marker.lat, lng: marker.lng}}
         icon={{
           url: `/loudspeaker.svg`,
           scaledSize: new window.google.maps.Size(30,30),
           origin: new window.google.maps.Point(0,0),
           anchor: new window.google.maps.Point(15,15),
          
         }}
         onClick = { ()=>{
           setSelected(marker);
         } }
         >
         </Marker>)}

         {newMarkerLocation ? (<InfoWindow
         position = {{lat:newMarkerLocation.lat, lng:newMarkerLocation.lng}}
         onCloseClick = {()=>{  //after the user click the close btn, set the current selected location as null
           setNewMarkerLocation(null)
         }}
         >
           <div className="EventCreateForm">
             <EventCreateForm lat={newMarkerLocation.lat} lng ={newMarkerLocation.lng} />
           </div>
         </InfoWindow>): null}



         {selected ? (<InfoWindow
         position = {{lat:selected.lat, lng:selected.lng}}
         onCloseClick = {()=>{  //after the user click the close btn, set the current selected location as null
           setSelected(null)
         }}
         >
           <div>
             <h2>This location is clicked!</h2>
             <p>Location at {selected.lat}, {selected.lng}</p>
             <p>The marker is created at {formatRelative(selected.time, new Date())} </p>
           </div>
         </InfoWindow>): null}

        </GoogleMap>
      
    </div>
  )


}


