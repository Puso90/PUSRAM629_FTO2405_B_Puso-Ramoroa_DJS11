import React, { useState } from "react";
import SearchBar from "/components/Search/searchbar.jsx"; 
import { SearchResultsList } from "./Search/SearchResultsList";
import "./Style/header.css";

export default function Header() {
    
    const [results, setResults] = useState([]);

    

    return (
        <header>
            <nav className="nav-bar">

            <div className="div-app-name">
                    <h3>Puso's Podcast Machine</h3>
                </div>
                
                <div className="search-bar-container">
                    <SearchBar setResults={setResults}/>
                    <SearchResultsList results={results}/>
                </div>

                
                
               
            </nav>
        </header>
    )
}