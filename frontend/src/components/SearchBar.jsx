import React,{useState, useCallback,useRef} from 'react'
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete'
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  
  
  import "@reach/combobox/styles.css"; 

 import "./SearchBar.css"





export default function Search({ panTo }) {

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

    // const inputStyle = {
    //   width: '50%',
    //   border: 'none',
    //   backgroundColor: '#c9c9c7',
    //   fontColor: 'white',
    //   position: 'relative'
  
    
    // };

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
            // style={inputStyle}
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
  