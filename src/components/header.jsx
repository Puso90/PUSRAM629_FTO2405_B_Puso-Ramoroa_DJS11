import React, { useState } from "react";
import SearchBar from "../components/Search/searchbar.jsx"; 
import { SearchResultsList } from "./Search/SearchResultsList";
import "./Style/header.css";
import { Link } from "react-router-dom";

export default function Header() {
    
    const [results, setResults] = useState([]);

    

    return (
        <header>
            <nav className="nav-bar">

                <div className="div-app-name">
                    <Link to={'/'}>
                        <h3>Puso's Podcast Machine</h3>
                    </Link>    
                </div>
                
                <div className="search-bar-container">
                    <SearchBar setResults={setResults}/>
                    <SearchResultsList results={results}/>
                </div>

                <div className="page-buttons-container">
                    <div className="homepage-button">
                        <Link to={'/'}>
                            Home
                        </Link>
                    </div>

                    <div className="shows-button podcast-detail">
                        <Link to={'/podcast/:id'}>
                            Shows
                        </Link>
                    </div>

                    <div className="favourites-nav-button favourites-page">
                        <Link to={'/favourites'}>
                            Favourites
                        </Link>
                    </div>
                </div>

               
            </nav>
        </header>
    )
}