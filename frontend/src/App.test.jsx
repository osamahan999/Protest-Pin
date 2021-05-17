import React from 'react';
import ReactDOM from 'react-dom'
import OrganizerRating from './components/RatingComponents/OrganizerRating'
import UserRating from './components/RatingComponents/UserRating'
import InfoModal from './components/InfoModal'
import EventCreateForm from './components/EventCreateForm'
import LocateCompass from './components/LocateCompass'
import Map from './components/Map'
import SearchBar from './components/SearchBar'
import SignUpModal from './components/SignUpModal'
import WelcomeModal from './components/WelcomeModal'
import Header from './components/Header'
import FilterModal from './components/FilterModal'

import { getAllByDisplayValue, getByDisplayValue, render, cleanup, screen,fireEvent } from '@testing-library/react';
import {getQueriesForElement} from '@testing-library/dom'
//import "jest-dom/extend-expect"
import "@testing-library/jest-dom/extend-expect";
import App from './App';
import { Info } from '@material-ui/icons';


afterEach(cleanup)



/**
 * checking the OrganizerRating Component render successfully
 */
 it("renders the OrgainzerRating without crashing", () => { 
  const root = document.createElement("div");
  ReactDOM.render(<OrganizerRating></OrganizerRating>,root)
})


/**
* checking the 3rd party component render correctly inside the OrganizerRating component
*/
it("check the 3rd-party component renders correctly inside the OrganizerRating", () => { 
const root = document.createElement("div");
ReactDOM.render(<OrganizerRating ></OrganizerRating>,root)
expect(root.querySelector("div").hasChildNodes()).toBe(true)

})


/**
 * Checking the UserRating Component  render successfully
 */

 it("renders UserRating without crashing", ()=>{
  const div = document.createElement("div");
  ReactDOM.render(<UserRating></UserRating>,div) 
})


/**
 * Checking the InfoModal Component successfully
 */
it("renders InfoModal without crashing", ()=>{
  const div = document.createElement("div");
  ReactDOM.render(<InfoModal></InfoModal>,div) 
})


/**
 * checking the the information display correctly by the InfoModal componenet
 */
 it("renders InfoModal display Event info correctly", ()=>{
 
  const root = document.createElement("div");
  const {getByText} = getQueriesForElement(root)
  ReactDOM.render(<InfoModal event_name={"Test Event"} event_description={"Test Description"}></InfoModal>,root)
  expect(root.querySelector("h2").textContent).toBe("Test Event")
  expect(root.querySelector("h4").textContent).toBe("Test Description")
  expect(root.querySelector("h5").textContent).not.toBeNull()
  expect(getByText("Organizer:")).not.toBeNull()
})


/**
 * checking the a tag is render successfully in InfoModal component
 */
 it("render a tag in InfoModal render correctly",()=>{
  const root = document.createElement("div");
  ReactDOM.render(<InfoModal></InfoModal>,root)
  expect(root.querySelector("a").textContent).toBe("Show me on Google Maps")
  expect(root.querySelector("a").hasAttribute("href")).toBe(true)
})


/**
 * checking the InfoModal's buttons display correctly
 * Assume the current event is organized by current user
 */
 it("renders Organizer InfoModal Buttons display correctly", ()=>{
  const root = document.createElement("div");
  ReactDOM.render(<InfoModal organizer_id={-1} user_id={-1}></InfoModal>,root)
  expect(root.querySelectorAll("button")[0].textContent).toBe("Back")
  expect(root.querySelectorAll("button")[1].textContent).toBe("Delete this event")
})



/**
 * checking the InfoModal's buttons display correctly
 * Assume the current event is NOT organized by current user
 */
 it("renders Regular User InfoModal Buttons display correctly", ()=>{
  const root = document.createElement("div");
  ReactDOM.render(<InfoModal organizer_id={-1} user_id={0}></InfoModal>,root)
  expect(root.querySelectorAll("button")[0].textContent).toBe("Back")
  expect(root.querySelectorAll("button")[1].textContent).toBe("Join")
})



/**
 * checking the EventCreateForm component can render successfully 
 */
it("renders EventCreateForm without crashing", ()=>{
  const root = document.createElement("div");
  ReactDOM.render(<EventCreateForm></EventCreateForm>,root) 
})


/**
 * checking the EventCreateForm component display the input fields for the user correctly
 * Input fields: textfield *2, submit button
 */
 it("renders EventCreateForm display input fields correctly", ()=>{
  const root = document.createElement("div");
  const {getByText} = getQueriesForElement(root)
  ReactDOM.render(<EventCreateForm></EventCreateForm>,root)
  expect(root.querySelector("h4").textContent).toBe("Create your protest!")
  expect(root.querySelectorAll("TextField")[0]).not.toBeNull()
  expect(root.querySelectorAll("TextField")[1]).not.toBeNull()
  expect(root.querySelector("button")).not.toBeNull()
})


/**
 * checking the google map render successfully
 */
it("renders the Google Map without crashing", () => { 
  const root = document.createElement("div");
  ReactDOM.render(<Map></Map>,root)
})

/**
 * checking the filter Modal button is correctly display on the map
 */
it("renders the Filter Modal (button) on the map without crashing", () => { 
  const root = document.createElement("div");
  const {getByText} = getQueriesForElement(root)
  ReactDOM.render(<FilterModal></FilterModal>,root)
  expect(root.querySelectorAll("button")[0].textContent).toBe("Filter")
})


/**
 * checking the Locate Compass render on the map successfully
 */
it("renders the Locate Compass on the map without crashing", () => { 
  const root = document.createElement("div");
  ReactDOM.render(<LocateCompass></LocateCompass>,root)
})



/**
 * checking the Search Bar render on the map successfully
 */
it("renders the Search Bar on the map without crashing", () => { 
  const root = document.createElement("div");
  ReactDOM.render(<SearchBar></SearchBar>,root)
})















