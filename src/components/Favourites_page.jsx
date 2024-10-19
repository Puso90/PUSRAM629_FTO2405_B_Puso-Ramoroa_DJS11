import React, { useEffect, useState } from 'react';
import Header from "./components/header";
import Footer from "./components/footer";
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

export default function Favourites() {
    const [likedPodcasts, setLikedPodcasts] = useState([]);
    const [genres, setGenres] = useState({});

    useEffect(() => {
        const storedLikes = JSON.parse(localStorage.getItem('favorites')) || [];
        const genresStorage = JSON.parse(localStorage.getItem('genres')) || {};
        setGenres(genresStorage)
        setLikedPodcasts(storedLikes);
    }, []);

    const toggleFavorite = (podcast) => {
        let updatedFavorites = [];
        if (likedPodcasts.includes(podcast)) {
          updatedFavorites = likedPodcasts.filter(show => show !== podcast); // Remove from favorites
        } else {
          updatedFavorites = [...likedPodcasts, podcast]; // Add to favorites
        }
        setLikedPodcasts(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage
        console.log(likedPodcasts)
      };

    
    return (
        <>
            <Header />
            <h1>Favourites</h1>
            <ul>
                {likedPodcasts.length === 0 ? (
                    <p>No favourite podcasts found.</p>
                ) : (
                    likedPodcasts.map(post => (
                        <li
                        className='list-style'
                        key={post.id}
                        style={{ margin: '5px' }}
                      >
                        <Link to={`/podcast/${post.id}`}>
                          <h2>{post.title}</h2>
                          <img className='podcast-image' src={post.image} alt='podcast image' />
                        </Link>
            
                        <div className='podcast-captions'>
                          <div className='last-update'>Last Update: {post.updated.slice(0, 10)}</div>
                          <div>Genres: {post.genres.map(id => genres[id]?.title).join(', ')}</div>
                          <div>Seasons: {post.seasons}</div>
                        </div>  
            
                        <div className='podcast-likes' onClick={() => toggleFavorite(post)}>
                            <FaHeart style={{ color: likedPodcasts.some(showLike => showLike.id === post.id) ? 'yellow' : 'grey' }} />
                        </div>
                        
                      </li>
                    ))
                )}
            </ul>
            <Footer />
        </>
    );
}
