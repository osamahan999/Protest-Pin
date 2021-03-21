import React,{useState, useCallback,useRef} from 'react'
import { GoogleMap, LoadScript,Marker,InfoWindow ,useLoadScript} from '@react-google-maps/api';
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
const libraries = ["places"];

export default function Map() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });
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

  const panTo = useCallback(({lat, lng}) =>{
    mapRef.current.panTo({lat, lng})
    mapRef.current.setZoom(12)
  },[])

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <h1>
        Protest Pin{" "}
      </h1>

      <Search panTo = {panTo}/>
      <Locate panTo = {panTo}/>

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
      
    </div>
  )


}

function Locate({panTo}){
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            //console.log(position)
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
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

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox 
      onSelect={async (address) => {
        setValue(address, false)
        clearSuggestions()
        try {
          const results = await getGeocode({address})
          const {lat, lng} = await getLatLng(results[0])
          panTo({lat, lng});
        } catch (error) {
          console.log(error)
          
        }
      }}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />

        <ComboboxPopover>
          <ComboboxList>
            {status === "OK"?
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              )):null}
          </ComboboxList>
        </ComboboxPopover>

      </Combobox>
    </div>
  );
}
