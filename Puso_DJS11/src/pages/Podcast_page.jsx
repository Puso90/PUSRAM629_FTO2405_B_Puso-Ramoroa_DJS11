import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import "/src/index.css";
import "/components/Style/Podcast_page.css";
import SortButtons from '../../components/SortButtons';
import "/components/Style/SortButtons.css";

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('All'); // State to track the current sorting order

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPodcasts(data); // Set the fetched podcasts in state
        console.log(data); // Log the fetched data for debugging
      } catch (error) {
        setError(error); // Set error state if fetch fails
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    fetchPodcasts(); // Call the fetch function
  }, []);

  const handleSort = (order) => {
    setSortOrder(order);
  };

  // Sort podcasts based on the current sort order
  const sortedPodcasts = () => {
    if (sortOrder === 'A-Z') {
      return [...podcasts].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'Z-A') {
      return [...podcasts].sort((a, b) => b.title.localeCompare(a.title));
    }
    return podcasts; // Return unsorted podcasts for 'All'
  };

  // Show loading state while fetching data
  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  // Show error message if there was a problem fetching data
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='podcast-container' style={{ marginTop: '100px' }}>
      <SortButtons onSort={handleSort} />
      <ul className='list-container' style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
        {sortedPodcasts().map((post) => (
          <li
            className='list-style'
            key={post.id}
            style={{ margin: '5px' }} // Margin between list items
          >
            {/* Link to the PodcastDetail page with the post ID */}
            <Link to={`/podcast/${post.id}`}>
              <h2>{post.title}</h2> {/* Podcast title */}
              <img className='podcast-image' src={post.image} alt='podcast image' /> {/* Podcast image */}
              <p className='last-update'>Last Update: {post.updated.slice(0, 10)}</p> {/* Last update date */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Podcasts;

