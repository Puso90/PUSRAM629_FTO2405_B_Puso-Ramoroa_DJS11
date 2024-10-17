import React from 'react';
import "./Style/SortButtons.css"; // Adjust path if necessary

export default function SortButtons() {
    return (
        <div className="SortButtons"> 
            <button className='sortButton allPodcasts'>
                All Podcasts
            </button>

            <button className='sortButton aToZ'>
                Sort: A-Z
            </button>

            <button className='sortButton zToA'>
                Sort: Z-A
            </button>

            <button className='sortButton genre dropDownButton'>
                Sort by genre
                {/* Optionally add dropdown here */}
            </button>
        </div>
    )
}