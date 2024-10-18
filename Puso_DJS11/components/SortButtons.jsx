import React, { useState } from 'react';
import "./Style/SortButtons.css";
import { FaHeart } from "react-icons/fa";

export default function SortButtons({ onSort, onFavoritesClick, isFavoritesActive }) {
    return (
        <div className="SortButtons"> 
            <button className='sortButton allPodcasts' onClick={() => onSort('All')}>
                All Podcasts
            </button>

            <button className='sortButton aToZ' onClick={() => onSort('A-Z')}>
                Sort: A-Z
            </button>

            <button className='sortButton zToA' onClick={() => onSort('Z-A')}>
                Sort: Z-A
            </button>

            <button onClick={() => onSort('Favorites')}>
        <FaHeart /> Favorites
      </button>
        </div>
    );
}

