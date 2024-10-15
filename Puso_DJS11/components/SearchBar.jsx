import React, {useState} from "react";
/* Use the useState to know what the user typed into the searchbar*/ 
import {FaSearch} from "react-icons/fa"
import "./SearchBar.css"



export default function SearchBar({ setResults }) {
    const [input, setInput] = useState("")

    /* Fetching Api data for the search element */
    const fetchData = (value) => {
        fetch("https://podcast-api.netlify.app")
        .then((response) => response.json())
        .then(json => {
    // works and when console logged out it acurately returns results
            const results = json.filter((post) => {
                return value && post && post.title && post.title.toLowerCase().includes(value);
            })
    // Leaving the log for demonstration purposes
    // Although it will also be self evident on UI, hopefully
            console.log(results)
            setResults(results)
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



/* Reference:
Make a Search Bar with React (with API Calls)
https://www.youtube.com/watch?v=sWVgMcz8Q44
*/