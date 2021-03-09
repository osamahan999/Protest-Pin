import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 37.335480,
  lng: -121.893028,
};

function App() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

  return (
    <LoadScript
      googleMapsApiKey = {apiKey}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(App)