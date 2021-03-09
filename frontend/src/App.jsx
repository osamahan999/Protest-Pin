import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

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

function App() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

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
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default React.memo(App)