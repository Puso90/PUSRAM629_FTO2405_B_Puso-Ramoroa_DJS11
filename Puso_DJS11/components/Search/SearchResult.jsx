import React from 'react';
import "./SearchResult.css"

export const SearchResult = ({result}) => {

    return <div className='search-result'>{result.post}</div>
}

//add an onClick event to send to specific podcast page