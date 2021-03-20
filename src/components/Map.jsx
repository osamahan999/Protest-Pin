import React,{useState, useCallback,useRef} from 'react'
import { GoogleMap, LoadScript,Marker,InfoWindow } from '@react-google-maps/api';
import {formatRelative} from 'date-fns' //to format the time 
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete'
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";


import "@reach/combobox/styles.css"; 
import mapStyles from '../mapStyles' //map style



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

function Map() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  const [markers, setMarkers] = useState([])
  const [selected,setSelected] = useState(null) //the marker was clicked by user
  const [selectedCenter, setSelectedCenter] = useState(null);
  const mapRef = useRef()  //use ref to avoid react to rerender

  const onMapLoad = useCallback( (map) => {
    mapRef.current = map;
  }, [] )

  const onMapClick =  useCallback( (event)=>{
    setMarkers(current => [...current,{
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    }])
  }, [])

  return (
    <div>
      <LoadScript
        googleMapsApiKey = {apiKey}
      >
      <h1>
        Protest Pin{" "}
      </h1>

      <Search/>

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
      </LoadScript>
    </div>
  )


}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  return(
    <div className = "search">
      <Combobox
        onSelect={(address) => {
          console.log(address)
        }}
      >
        <ComboboxInput
          value = {value}
          onChange = { (e) => {
            setValue(e.target.value)
          }}
          //disabled = {!ready}
          placeholder = "Enter an address"
        />

      </Combobox>
    </div>
  )
  
  
}



export default React.memo(Map)