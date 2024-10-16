import React, { useEffect, useState } from 'react';
import "/src/index.css";

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
        setPosts(data);
        // Log the fetched data from the API
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    
    <div className='podcast-container' style={{ marginTop: '20px' }}> {/* Add margin above */}
      <ul className='list-container' style={{ display: 'flex', flexWrap: 'wrap', padding: 0 }}>
        {posts
          .sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
            return 0;
          }) // Sort alphabetically by title
          .map((post, index) => (
            <li 
              className='list-style' 
              key={post.id} 
              style={{ 
                margin: '5px' // Margin between items
              }}
            >
              <h2>{post.title}</h2>
              <img className='podcast-image' src={post.image} alt='podcast image' />
              <p className='last-update'>Last Update: {post.updated.slice(0, 10)}</p>
            </li>
          ))}
      </ul>
    </div>
    
  );
};

export default Posts;