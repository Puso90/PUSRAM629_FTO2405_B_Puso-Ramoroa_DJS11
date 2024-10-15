import React, {useState} from "react";
/* Use the useState to know what the user typed into the searchbar*/ 
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"



export default function SearchBar() {
    const [input, setInput] = useState("")

    /* Fetching Api data for the search element */
    const fetchData = (value) => {
        fetch("https://podcast-api.netlify.app")
        .then((response) => response.json())
        .then(json => {
            console.log(json)
        })
        
    }

    //Whenever the search bar changes it will make request to the fetchData Api 
    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input placeholder="Search for podcast..." 
            value={input} 
            onChange={(e) => handleChange(e.target.value) } 
            /> 
        </div>
    )
}