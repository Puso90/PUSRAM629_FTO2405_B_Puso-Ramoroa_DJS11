import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import "/src/index.css";
import "/components/Style/Podcast_page.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data); // Set the fetched posts in state
        console.log(data); // Log the fetched data for debugging
      } catch (error) {
        setError(error); // Set error state if fetch fails
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    fetchPosts(); // Call the fetch function
  }, []);

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
      <ul className='list-container' style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
        {posts
          .sort((a, b) => {
            // Sort posts alphabetically by title
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
          })
          .map((post) => (
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

export default Posts;
