import React,{useState} from 'react'
import { GoogleMap, LoadScript,Marker, } from '@react-google-maps/api';

import mapStyles from './mapStyles'

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

  return (
    <div>
      <LoadScript
        googleMapsApiKey = {apiKey}
      >
      <h1>
        Protest Pin{" "}
      </h1>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={options}
          onClick={(event)=>{
            setMarkers(current => [...current,{
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
              time: new Date(),
            }])
          }}
        >
         {markers.map(marker => <Marker key={marker.time.toISOString()} 
         position={{lat:marker.lat, lng: marker.lng}}
         icon={{
           url: `/loudspeaker.svg`,
           scaledSize: new window.google.maps.Size(30,30)
         }}
         >
         </Marker>)}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default React.memo(Map)