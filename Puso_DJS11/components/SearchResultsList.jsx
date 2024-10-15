import React from 'react';
import "./SearchResultsList.css"
import { SearchResult } from './SearchResult';


//instead of normal function I will play around with arrow funtion
export const SearchResultsList = ({results}) => {

    // Below I will map() each result from the user search 
    // and array to render on search result modal
    return (
        <div className='results-list'>
            {
                results.map((result, id) => {
                    return <SearchResult result={result} key={id}/>
                })
            }
        </div>
    )
}