import React from 'react';
import { Link } from 'react-router-dom';
import "./SearchResult.css"

export const SearchResult = ({result}) => {
    return (
        
        <Link to={`/podcast/${result.id}`}>
                <div className='search-result'>
                    {result.title}
                </div>
        </Link>
        
    )
}

//add an onClick event to send to specific podcast page


