import React, { useEffect, useState } from 'react'; // React and hooks for state and lifecycle management
import { Link } from 'react-router-dom'; // Link component for navigation to other pages
import "/src/index.css";
import "../components/Style/Podcast_page.css";
import SortButtons from "../components/SortButtons"; // Import SortButtons component for sorting functionality
import "../components/Style/SortButtons.css";
import { FaHeart } from 'react-icons/fa'; // Icon library for favorite button display

// Podcasts component displays list of all podcasts and allows sorting/filtering by genre and favorites
const Podcasts = () => {
  // State to store podcasts data, genre options, loading and error states, selected sort order, selected genre filter, and favorites
  const [podcasts, setPodcasts] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('All'); // Default sort order is 'All'
  const [selectedGenre, setSelectedGenre] = useState(null); // Tracks selected genre for filtering
  const [favorites, setFavorites] = useState([]); // Stores user's favorite podcasts
  
  // Initial load of stored favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []; // Retrieve or initialize empty array
    setFavorites(storedFavorites); // Set favorites from localStorage
  }, []);

  // Fetch podcasts and genres data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const podcastsResponse = await fetch('https://podcast-api.netlify.app');
        if (!podcastsResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const podcastsData = await podcastsResponse.json(); // Parse JSON data
        setPodcasts(podcastsData); // Store podcasts data

        // Extract unique genre IDs from podcasts data and fetch genre details
        const uniqueGenreIds = [...new Set(podcastsData.flatMap(podcast => podcast.genres))];
        const genrePromises = uniqueGenreIds.map(id => 
          fetch(`https://podcast-api.netlify.app/genre/${id}`).then(res => res.json())
        );
        const genresData = await Promise.all(genrePromises);
        
        // Format genre data into an object keyed by genre ID
        const genresObject = genresData.reduce((acc, genre) => {
          acc[genre.id] = genre;
          return acc;
        }, {});
        
        // Store genres in localStorage and update state
        localStorage.setItem('genres', JSON.stringify(genresObject));
        setGenres(genresObject);
        
      } catch (error) {
        setError(error); // Handle and store error if fetch fails
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData(); // Call fetch function on mount
  }, []);

  // Function to handle sorting by different orders (All, A-Z, Z-A, Favorites)
  const handleSort = (order) => {
    setSortOrder(order); // Update sortOrder state based on user selection
    if (order === 'All') {
      setSelectedGenre(null); // Reset genre filter if "All" is selected
    }
  };

  // Function to handle genre filtering
  const handleGenreFilter = (genreId) => {
    // Toggle genre selection: if genre is already selected, deselect it
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
  };

  // Function to sort and filter podcasts based on user-selected criteria
  const sortedAndFilteredPodcasts = () => {
    // Filter podcasts by selected genre if any
    let filteredPodcasts = selectedGenre
      ? podcasts.filter(podcast => podcast.genres.includes(selectedGenre))
      : podcasts;

    // Apply sorting based on sortOrder state
    if (sortOrder === 'Favorites') {
      return filteredPodcasts.filter(podcast => favorites.some(fav => fav.id === podcast.id)); // Filter by favorites
    } else if (sortOrder === 'A-Z') {
      return [...filteredPodcasts].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'Z-A') {
      return [...filteredPodcasts].sort((a, b) => b.title.localeCompare(a.title));
    }

    return filteredPodcasts;
  };

  // Return loading or error messages if either state is active
  if (loading) {
    return <div className='loading'>Loading...</div>; // Show loading message if data is still fetching
  }
  if (error) {
    return <div>Error: {error.message}</div>; // Show error if there was a fetch issue
  }

  // Main return statement rendering sorted and filtered podcast list
  return (
    <div className='podcast-container' style={{ marginTop: '100px' }}>
      <SortButtons onSort={handleSort} /> {/* SortButtons component passes sorting action to Podcasts */}
    
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

      {/* Render filtered and sorted podcasts */}
      <ul className='list-container' style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
        {sortedAndFilteredPodcasts().map((post) => (
          <li
            className='list-style'
            key={post.id}
            style={{ margin: '5px' }}
          >
            {/* Link to PodcastShows page for each podcast */}
            <Link to={`/podcast/${post.id}`}>
              <h2>{post.title}</h2>
              <img className='podcast-image' src={post.image} alt='podcast image' />
            </Link>

            <div className='podcast-captions'>
              <div className='last-update'>Last Update: {post.updated.slice(0, 10)}</div> {/* Last update date */}
              <div>Genres: {post.genres.map(id => genres[id]?.title).join(', ')}</div> {/* Display genre titles */}
              <div>Seasons: {post.seasons}</div> {/* Display season count */}
            </div>  

            {/* Heart icon toggles favorite status, changing color based on state */}
            <div className='podcast-likes' onClick={() => toggleFavorite(post)}>
              <FaHeart style={{ color: favorites.some(fav => fav.id === post.id) ? 'yellow' : 'grey' }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Podcasts;
