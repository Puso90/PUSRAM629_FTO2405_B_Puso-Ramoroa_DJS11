import React, { useEffect, useState } from 'react';
import "/src/index.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
  };

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
              className='sorted-list-style' 
              key={post.id} 
              style={{ 
                flex: '0 0 calc(12.5% - 10px)', // 8 columns with space
                margin: '5px' // Margin between items
              }}
            >
              <h2>{post.title}</h2>
              <img className='podcast-image' src={post.image} alt='podcast image' />
              <p>Last Update: {post.updated}</p>
            </li>
          ))}
      </ul>
    </div>
    
  );
};

export default Posts;