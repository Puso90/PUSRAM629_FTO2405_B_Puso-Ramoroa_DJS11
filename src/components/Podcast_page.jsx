import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "/src/index.css";
import "../components/Style/Podcast_page.css";
import SortButtons from "./SortButtons";
import "../components/Style/SortButtons.css";
import { FaHeart } from 'react-icons/fa';

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [displayPodcasts, setDisplayPodcasts] = useState([]);
  const [genres, setGenres] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [dateSortOrder, setDateSortOrder] = useState('latest'); 
  const [podcastDetails, setPodcastDetails] = useState({});

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
        setDisplayPodcasts(podcastsData); 
  
        const uniqueGenreIds = [...new Set(podcastsData.flatMap(podcast => podcast.genres))];
        const genrePromises = uniqueGenreIds.map(id =>
          fetch(`https://podcast-api.netlify.app/genre/${id}`).then(res => res.json())
        );
        const genresData = await Promise.all(genrePromises);
        const genresObject = genresData.reduce((acc, genre) => {
          acc[genre.id] = genre;
          return acc;
        }, {});
  
        localStorage.setItem('genres', JSON.stringify(genresObject));
        setGenres(genresObject);
  
        // Fetch episodes for each podcast
        const podcastPromises = podcastsData.map(podcast => 
          fetch(`https://podcast-api.netlify.app/id/${podcast.id}`).then(res => res.json())
        );
        const podcastsWithEpisodes = await Promise.all(podcastPromises);
        const detailsObject = {};
        podcastsWithEpisodes.forEach((detail, index) => {
          detailsObject[podcastsData[index].id] = detail;
        });
        setPodcastDetails(detailsObject);
  
        // Delay initial sorting
        setTimeout(() => {
          setSortOrder('A-Z');
          setDisplayPodcasts([...podcastsData].sort((a, b) => a.title.localeCompare(b.title)));
        }, 1000); // Adjust delay time as needed
  
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  // Update displayPodcasts whenever selectedGenre changes
  useEffect(() => {
    if (selectedGenre) {
      const filteredPodcasts = podcasts.filter(podcast => podcast.genres.includes(selectedGenre));
      setDisplayPodcasts(filteredPodcasts);
    } else {
      setDisplayPodcasts(podcasts);
    }
  }, [selectedGenre, podcasts]);

  const toggleFavorite = (podcast) => {
    let updatedFavorites = [];
    if (favorites.includes(podcast)) {
      updatedFavorites = favorites.filter(show => show !== podcast);
    } else {
      updatedFavorites = [...favorites, podcast];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleSort = (order) => {
    if (order === 'All') {
      setSelectedGenre(null);
      setDisplayPodcasts(podcasts);
    } else if (order === 'Oldest/Latest') {
      setDateSortOrder(prevOrder => prevOrder === 'latest' ? 'oldest' : 'latest');
      setSortOrder('date');
      setDisplayPodcasts(sortedAndFilteredPodcasts('date'));
    } else {
      setSortOrder(order);
      setDisplayPodcasts(sortedAndFilteredPodcasts(order));
    }
  };

  const handleGenreFilter = (genreId) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
  };

  const sortedAndFilteredPodcasts = (order) => {
    let filteredPodcasts = selectedGenre
      ? podcasts.filter(podcast => podcast.genres.includes(selectedGenre))
      : podcasts;

    if (order === 'A-Z') {
      return [...filteredPodcasts].sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === 'Z-A') {
      return [...filteredPodcasts].sort((a, b) => b.title.localeCompare(a.title));
    } else if (order === 'Favorites') {
      return filteredPodcasts.filter(podcast => favorites.includes(podcast.id));
    } else if (order === 'date') {
      return [...filteredPodcasts].sort((a, b) => 
        dateSortOrder === 'latest' 
          ? new Date(b.updated) - new Date(a.updated) 
          : new Date(a.updated) - new Date(b.updated)
      );
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
      <SortButtons onSort={handleSort} dateSortOrder={dateSortOrder} />
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
        {displayPodcasts.map((post) => (
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
              <div style={{ marginBottom: '8px' }}>Episodes: {podcastDetails[post.id]?.totalEpisodes || 'Loading...'}</div>
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





