import React from "react";
import  SearchBar  from "/components/SearchBar.jsx";


export default function Header() {
    

    

    return (
        <header>
            
            <nav className="nav-bar">

            <div className="div-app-name">
                    <h3>Puso's Podcast Machine</h3>
                </div>
                
                <div className="search-bar-container">
                    <SearchBar />
                    <div>Search Results</div>
                </div>

                
                
               
            </nav>
        </header>
    )
}