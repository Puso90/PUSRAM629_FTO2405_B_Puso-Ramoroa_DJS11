import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "/src/index.css";
import "../components/Style/Podcast_page.css";
import SortButtons from "../components/SortButtons";
import "../components/Style/SortButtons.css";
import { FaHeart } from 'react-icons/fa';
import Favourites from '../../components/Favourites_page';

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Retrieve favorites from localStorage on initial load
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const podcastsResponse = await fetch('https://podcast-api.netlify.app');
        if (!podcastsResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const podcastsData = await podcastsResponse.json();
        setPodcasts(podcastsData);

        const uniqueGenreIds = [...new Set(podcastsData.flatMap(podcast => podcast.genres))];

        const genrePromises = uniqueGenreIds.map(id => 
          fetch(`https://podcast-api.netlify.app/genre/${id}`).then(res => res.json())
        );
        const genresData = await Promise.all(genrePromises);
        const genresObject = genresData.reduce((acc, genre) => {
          acc[genre.id] = genre;
          return acc;
        }, {});
        //console.log(genresObject)

        //set genreObj to local storage
        
        localStorage.setItem('genres', JSON.stringify(genresObject))
        setGenres(genresObject);
        
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle favorite podcast
  const toggleFavorite = (podcast) => {
    let updatedFavorites = [];
    if (favorites.includes(podcast)) {
      updatedFavorites = favorites.filter(show => show !== podcast); // Remove from favorites
    } else {
      updatedFavorites = [...favorites, podcast]; // Add to favorites
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage
    console.log(favorites)
  };
  
  const handleSort = (order) => {
    if (order === 'All') {
      setSelectedGenre(null); // Reset genre when "All Podcasts" is clicked
    }
    setSortOrder(order);
  };

  const handleGenreFilter = (genreId) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
  };

  const sortedAndFilteredPodcasts = () => {
    let filteredPodcasts = selectedGenre
      ? podcasts.filter(podcast => podcast.genres.includes(selectedGenre))
      : podcasts;

    if (sortOrder === 'A-Z') {
      return [...filteredPodcasts].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'Z-A') {
      return [...filteredPodcasts].sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOrder === 'Favorites') {
      return filteredPodcasts.filter(podcast => favorites.includes(podcast.id)); // Filter by favorites
    }
    return filteredPodcasts;
  };

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  

  return (
    <div className='podcast-container' style={{ marginTop: '100px' }}>
      <SortButtons onSort={handleSort} />
      <div className="genre-buttons">
        {Object.values(genres).map(genre => (
          <button
            key={genre.id}
            onClick={() => handleGenreFilter(genre.id)}
            className={selectedGenre === genre.id ? 'active' : ''}
          >
            {genre.title}
          </button>
        ))}
      </div>
      <ul className='list-container' style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
        {sortedAndFilteredPodcasts().map((post) => (
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
              <FaHeart style={{ color: favorites.some(showLike => showLike.id === post.id) ? 'yellow' : 'grey' }} />
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Podcasts;
